<?php
include 'Connection.php';
session_start();

$login_check = $_SESSION['id'];

$level = $_SESSION['level'];

if ($login_check != '1') {
    $_SESSION['intended_url'] = $_SERVER['SCRIPT_URI'];
    header("location: ../Login/login.php");
}
if (isset($_GET['ticket_id']) && !empty($_GET['ticket_id'])) {
    $ticket_id = $_GET['ticket_id'];
    
    $ticketSql = "SELECT * FROM `tickettypes` where id='$ticket_id'";
    $resultTicket = mysqli_query($db, $ticketSql);
    $ticketData = mysqli_fetch_assoc($resultTicket);
    if(isset($_GET['getData'])){
        $currentDate = date('Y-m-d');
        $search = isset($_GET['search']['value']) ? $_GET['search']['value'] : '';
        $start = isset( $_GET[ 'start' ] ) ? $_GET[ 'start' ] : 0;
        // Set $start to 0 if it's not set
        $length = isset($_GET['length']) ? $_GET['length'] : 10; // Set $length to 10 if it's not set
        $query = "SELECT ticket_prices.date,ticket_prices.id,
                    ticket_prices.park_price, 
                    tickettypes.ticket_name as name ,
                    ticket_prices.price,
                    ticket_prices.price_adult,
                    ticket_prices.price_child,
                    ticket_prices.KGS_Adult,
                    ticket_prices.KGS_Child
                    FROM ticket_prices  
                    JOIN tickettypes ON tickettypes.id = ticket_prices.ticket_id 
                    WHERE ticket_prices.date >= '$currentDate' and ticket_prices.ticket_id=".$ticket_id;
        if ( !empty( $search ) ) {

        }
        $query .= " ORDER BY ticket_prices.date  ASC  LIMIT $start, $length";
        $result = mysqli_query( $db, $query );
        $data = array();
        while ( $row = mysqli_fetch_assoc( $result ) ) {
            $row[ 'price' ] =$row['price'];
            $row[ 'park_price' ] =($row['park_price']>0)?$row['park_price']:'0';
            $row[ 'date' ] = date( 'm/d/Y', strtotime( $row[ 'date' ] ) );
            $row['actions'] = '<a href="javascript:void(0)" class="text-primary m-2 editPrice" data-id="'.$row['id'].'"><i class="fa fa-edit"></i></a>
            <a   href="javascript:void(0)"  data-id="'.$row['id'].'"  class="text-danger m-2 Delete"><i class="fa fa-trash"></i></a>
            
        ';
            $data[] = $row;
        }
        $query = "SELECT ticket_prices.date,ticket_prices.id, 
        tickettypes.ticket_name as name ,
        ticket_prices.price,
        ticket_prices.price_adult,
        ticket_prices.price_child,
        ticket_prices.KGS_Adult,
        ticket_prices.KGS_Child
        FROM ticket_prices  
        JOIN tickettypes ON tickettypes.id = ticket_prices.ticket_id 
        WHERE ticket_prices.date >= '$currentDate' and ticket_prices.ticket_id=".$ticket_id;
        if ( !empty( $search ) ) {

        }
        $query .= " ORDER BY ticket_prices.id  DESC";
        $totalRecords = mysqli_num_rows(mysqli_query($db,$query));

        $output = array(
            'draw' => $_GET[ 'draw' ],
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalRecords,
            'data' => $data
        );
        echo json_encode( $output );
        exit;
    }
    if(isset($_POST['addPrice'])){
        ob_start();
        $price = $_POST['price'];
        $ticketid = $_POST['ticket_id'];
        $date = $_POST['date'];
        $parkPrice = $_POST['park_price']??0;
          $errors = array();
        // Validate the price.
        if ($price <= 0) {
          $errors['price'] = 'The price must be greater than 0.';
        }
        
        // Validate the ticket ID.
        if (!is_numeric($ticket_id)) {
          $errors['ticket_id'] = 'The ticket ID must be a number.';
        }
        
        // Validate the date.
        if (empty($date)) {
          $errors['date'] = 'The date must not be null.';
        }
        
        // Check for errors.
        if (count($errors) > 0) {
          // Save the errors in the session.
          $_SESSION['errors'] = $errors;
        
          // Redirect to the same page.
          header('Location: TicketPrices.php?ticket_id='.$ticket_id);
          exit;
        } else {
            if(isset($_POST['id']) && !empty($_POST['id'])){
                $id =  $_POST['id'];
                $partner_insert = "UPDATE  `ticket_prices` SET
                price = '$price',
                park_price ='$parkPrice',
                date = '$date'
                WHERE id='$id'";
                try {
                    mysqli_query($db, $partner_insert);
                    $_SESSION['success'] = 'The data has been saved successfully.';
                } catch (Exception $e) {
                    $errors['error'] = mysqli_error($db);
                }
            }
            else{
                $sql="SELECT * FROM  ticket_prices where ticket_id='$ticketid' && date ='$date'";

                $result=mysqli_query($db,$sql);

                $pricee=mysqli_fetch_assoc($result);

                if($pricee && isset($pricee['id'])){
                    $price_id = $pricee['id'];
                    $partner_insert = "UPDATE  `ticket_prices` SET
                    price = '$price',
                    park_price ='$parkPrice',
                    WHERE id='$price_id'";
                }
                else{
                    $partner_insert = "INSERT INTO `ticket_prices` (date, price, ticket_id,park_price)
                    VALUES ('$date','$price','$ticket_id','$parkPrice')";
                }
                try {
                mysqli_query($db, $partner_insert);
                $_SESSION['success'] = 'The data has been saved successfully.';
                } catch (Exception $e) {
                $errors['error'] = mysqli_error($db);
                }
            }
        
          // Redirect to the success page.
          header('Location: TicketPrices.php?ticket_id='.$ticket_id);
          exit;
        }
        ob_end_flush();
    }
    if(isset($_GET['action']) && isset($_GET['id'])){
        $output = array();
        if($_GET['action']=='editRecord'){
            $id = $_GET['id'];
            $sql="SELECT * FROM  ticket_prices where id='$id'";
            $result=mysqli_query($db,$sql);
            $rep=mysqli_fetch_assoc($result);
            if($rep){
                $output = array('data'=>$rep,'status'=>true);
            }else{
                $output = array('data'=>$rep,'status'=>false);
            }
        }
        else if($_GET['action']=='deleteRecord'){
            $id = $_GET['id'];
            $sql="DELETE FROM  ticket_prices where id='$id'";
            $result=mysqli_query($db,$sql);
            if ($result && mysqli_affected_rows($db) > 0) {
                $output = array('status'=>true);
            }else{
                $output = array('status'=>false);
            }
        }
   
        echo json_encode( $output );
        exit;
    }
    if(isset($_POST['action']) && $_POST['action']=='updateBulk'){
        if(isset($_POST['rows']) && count($_POST['rows'])>0){
            $rows = $_POST['rows'];
            foreach ($rows as $row) {
                $id = $row['id'];
                $price = $row['price'];
                $parkPrice = $row['park_price'];
                $sql = "UPDATE  `ticket_prices` SET
                price = '$price',
                park_price ='$parkPrice'
                WHERE id='$id'";
                mysqli_query($db, $sql);
            }
            echo true;
            exit;
        }
        else{
            echo false;
            exit;
        }
    }
}
else{
    $_SESSION['errors']['error'] = "Ticket ID not found";
    header('Location: TicketsDetails.php');
}
include '../includes/header.php';
?>



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
<style>
    @media only screen and (max-width: 480px) {

        .anamob {
            display: block !important;
        }


    }

    .anamob {
        display: none;
    }
    .chat-online {
    color: #34ce57
}

.chat-offline {
    color: #e4606d
}

.chat-messages {
    display: flex;
    flex-direction: column;
    max-height: 730px;
    overflow-y: scroll
}

.chat-message-left,
.chat-message-right {
    display: flex;
    flex-shrink: 0
}

.chat-message-left {
    margin-right: auto
}

.chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.flex-grow-0 {
    flex-grow: 0!important;
}
.border-top {
    border-top: 1px solid #dee2e6!important;
}

</style>
<div id="content-wrapper">

    <div class="container-fluid">
    <?php 
           if (isset($_SESSION['errors'])) {
            $errors = $_SESSION['errors'];
            foreach ($errors as $key => $error) {
              echo '<div class="alert alert-danger" role="alert">' . $error . '</div>';
            }
            unset($_SESSION['errors']);
          }
          if (isset($_SESSION['success'])) {
                $success = $_SESSION['success'];
              echo '<div class="alert alert-success" role="alert">' . $success . '</div>';
              unset($_SESSION['success']);
          }?>
          <div class="alert d-none alert-success" id="pageAlertSuccess" role="alert"></div>
          <div class="alert alert-danger d-none" id="pageAlertError" role="alert"></div>
    <div class="row mb-3">

      <div class="col-md-12">

        <div class="col-md-8 new-header" style="float:left;">
          <!-- <h3 class="new-fonts">Ticket Prices</h3> -->
        </div>

        <div class="col-md-4 text-right new-header" style="float:left;">


          <a href="javascript:void(0)" data-toggle="modal" data-target="#variable-price-modal" class="btn btn-primary">Add New</a>
          <a href="AddBulkPirces.php?ticket_id=<?=$ticket_id?>"  class="btn btn-info">Add Bulk</a>
          <!-- <a href="../messages/compose_message.php" class="btn btn-secondary">Send Message</a>  -->
        </div>

      </div>

    </div>
     

        <div class="row">

            <div class="col-md-12">

                <div class="card rounded shadow">
                    <div class="card-header">
                        <h4>Ticket Prices - <?=isset($ticketData)? $ticketData['ticket_name']:''?></h4>
                        <button class="btn btn-danger float-right" type="button" id="updatePrices">Update</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="user-table" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="selecteAllrows"/></th>
                                        <th>Ticket</th>
                                        <th>Date</th>
                                        <th>Ours</th>
                                        <th>Park</th>
                                        <th>Sell A</th>
                                        <th>Sell C</th>
                                        <th>KGS A</th>
                                        <th>KGS C</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  
  </div>
</div>
<div class="modal fade" id="variable-price-modal">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Add Ticket Variable Price</h4>
                <button type="button" class="close ml-0" data-dismiss="modal">&times;</button>
            </div>
            <form action="" class="" autocomplete='off' autocomplete='off' method="post">
                <div class="modal-body">
                    <div class="col-md-6">
                      <div class="form-group">
                          <label class="font-weight-bold">Date</label>
                          <input type="date" name="date" required class="form-control" id="date">
                          <input type="hidden" value="<?=$ticket_id?>" name="ticket_id" id="v_ticket_id">
                          <input type="hidden" value="" name="id" id="v_id">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label class="font-weight-bold">Price</label>
                          <input type="number" step="0.01" class="form-control" name="price" id="v_price">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label class="font-weight-bold">Park Price</label>
                          <input type="number" step="0.01" class="form-control" name="park_price" id="p_price">
                      </div>
                    </div>

                  </div>
                    <div class="modal-footer">
                        <button type="submit" name="addPrice" class="btn btn-success">Submit</button>
                    </div>


            </form>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<script>
    $(document).ready(function() {
        var ticket_id = "<?=$ticket_id?>";
        $('#user-table').DataTable({
            serverSide: true,
            pageLength: 10,
            searching: false,
            ordering: false,
            ajax: {
                url: 'TicketPrices.php?getData=true&ticket_id='+ticket_id,
                type: 'GET'
            },
            "columns": 
            [   
                {
                     "data": "id",
                    "render": function(data, type, row) {
                        return `<input type="checkbox" class="dtCk-rows" value="${row.id}">`
                    }
                },
                {
                    "data": "name",
                },
                {
                    "data": "date",
                },
                {
                    "data": "price",
                    "render": function(data, type, row) {
                        return `<input type="number" class="Price" name="Price[]" step="0.01" class="dtCk-rows" value="${row.price}">`
                    }
                },
                {
                    "data": "park_price",
                    "render": function(data, type, row) {
                        return `<input type="number" class="ParkPrice" name="ParkPrice[]" step="0.01" class="dtCk-rows" value="${row.park_price}">`
                    }
                },
                {
                    "data": "price_adult",
                    "render": function(data, type, row) {
                        return row.price_adult ? row.price_adult : '0.00';
                    }
                },
                {
                    "data": "price_child",
                    "render": function(data, type, row) {
                        return row.price_child ? row.price_child : '0.00';
                    }
                },
                {
                    "data": "KGS_Adult",
                    "render": function(data, type, row) {
                        return row.KGS_Adult ? row.KGS_Adult : '0.00';
                    }
                },
                {
                    "data": "KGS_Child",
                    "render": function(data, type, row) {
                        return row.KGS_Child ? row.KGS_Child : '0.00';
                    }
                },
                {
                    "data":"actions",
                }
            ]
        });
        $('body').on('click','.editPrice',function(e){
            event.preventDefault();
            var id = $(this).data('id');
            $("#pageAlertError").addClass("d-none");
            $.ajax({
                url: 'TicketPrices.php',
                method:'GET',
                data:{action:'editRecord',id:id,ticket_id:ticket_id},
                success: function (res) {
                   let rep = JSON.parse(res);
                    if(rep?.status){
                        $("#date").val(rep.data.date);
                        $("#v_price").val(rep.data.price);
                        $("#p_price").val(rep.data.park_price);
                        $("#v_id").val(rep.data.id);
                        $("#variable-price-modal").modal('toggle');
                    }
                    else{
                        $("#pageAlertError").text("Record not found");
                        $("#pageAlertError").removeClass("d-none");
                        
                    }
                },
                error: function(xhr, status, error) {
                    $("#pageAlertError").text('An error occurred: ' + xhr.responseText);
                    $("#pageAlertError").removeClass("d-none");
                }
            });
        });
        $('body').on('click','.Delete',function(e){
            event.preventDefault();
            var id = $(this).data('id');
            $("#pageAlertError").addClass("d-none");
            $.ajax({
                url: 'TicketPrices.php',
                method:'GET',
                data:{action:'deleteRecord',id:id,ticket_id:ticket_id},
                success: function (res) {
                   let rep = JSON.parse(res);
                    if(rep?.status){
                        var table = $('#user-table').DataTable();
                        table.ajax.reload();
                    }
                    else{
                        $("#pageAlertError").text("Record not deleted");
                        $("#pageAlertError").removeClass("d-none");
                    }
                },
                error: function(xhr, status, error) {
                    $("#pageAlertError").text('An error occurred: ' + xhr.responseText);
                    $("#pageAlertError").removeClass("d-none");
                }
            });
        });
        $("#selecteAllrows").on('click',function(){
            if($(this).is(':checked')){
                $('.dtCk-rows').prop('checked',true);
            }
            else{
                $('.dtCk-rows').prop('checked',false);
            }
        });
        $('#updatePrices').on('click', function() {
            var selectedRows = [];
            $("#pageAlertError").addClass("d-none");
            $("#pageAlertSuccess").addClass("d-none");
        $('.dtCk-rows:checked').each(function() {
            var id = $(this).val();
            var value = $(this).closest('tr').find('.Price').val();
            var park_price = $(this).closest('tr').find('.ParkPrice').val();
            selectedRows.push({ id: id, price: value ,park_price:park_price});
        });
        if(selectedRows.length>0){
            $.ajax({
                url: 'TicketPrices.php?ticket_id='+ticket_id,  // Replace with your server-side script URL
                method: 'POST',
                data: { rows: selectedRows,action:'updateBulk'},
                success: function(response) {
                    if(response){
                        var table = $('#user-table').DataTable();
                        table.ajax.reload();
                        $("#selecteAllrows").prop('checked',false);
                        $("#pageAlertSuccess").text('Prices Updated Successfully')
                        $("#pageAlertSuccess").removeClass("d-none");
                        $("#pageAlertError").addClass("d-none");
                    }
                    else{
                        $("#pageAlertError").text("Not Updated");
                        $("#pageAlertError").removeClass("d-none");
                        $("#pageAlertSuccess").addClass("d-none");
                    }
                },
                error: function(xhr, status, error) {
                    // Handle error response from the server if needed
                    console.error(error);
                }
            });
        }
        else{
            $("#pageAlertError").text("Select Row");
        $("#pageAlertError").removeClass("d-none");
        }
    });
       
    });

</script>
</body>
</html>
