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

    $ticketsSql = "SELECT * FROM `tickettypes` where adctive='True' and id <> '$ticket_id'";
    $resultTickets = mysqli_query($db, $ticketsSql);
    $allTickets = mysqli_fetch_all($resultTickets, MYSQLI_ASSOC);
    if(isset($_POST['addPrice'])){
        $ticketId = $_POST['ticket_id'];
        $dates = array();
        foreach($_POST['date'] as $key=>  $dte){
            if(isset($dte) && !empty($dte) && isset($_POST['price'][$key]) && !empty($_POST['price'][$key]) && $_POST['price'][$key] >0 ){
                $price = $_POST['price'][$key];
                $parkPrice = $_POST['park_price'][$key]??0;
                $sql="SELECT * FROM  ticket_prices where ticket_id='$ticketId' && date ='$dte'";

                $result=mysqli_query($db,$sql);

                $pricee=mysqli_fetch_assoc($result);

                if($pricee && isset($pricee['id'])){
                    $price_id = $pricee['id'];
                    $partner_insert = "UPDATE  `ticket_prices` SET
                    price = '$price',
                    park_price ='$parkPrice'
                    WHERE id='$price_id'";
                }
                else{
                    $partner_insert = "INSERT INTO `ticket_prices` (date, price, ticket_id,park_price)
                    VALUES ('$dte','$price','$ticketId','$parkPrice')";
                }
                try {
                mysqli_query($db, $partner_insert);
                    $_SESSION['success'] = 'The data has been saved successfully.';
                } catch (Exception $e) {
                    $errors['error'] = mysqli_error($db);
                }
            }

            
        }
        foreach($_POST['ticketsIds'] as $tId){
            $ticketId = $tId;
            foreach($_POST['date'] as $key=>  $dte){
                if(isset($dte) && !empty($dte) && isset($_POST['price'][$key]) && !empty($_POST['price'][$key]) && $_POST['price'][$key] >0 ){
                    $price = $_POST['price'][$key];
                    $parkPrice = $_POST['park_price'][$key]??0;
                    $sql="SELECT * FROM  ticket_prices where ticket_id='$ticketId' && date ='$dte'";
    
                    $result=mysqli_query($db,$sql);
    
                    $pricee=mysqli_fetch_assoc($result);
    
                    if($pricee && isset($pricee['id'])){
                        $price_id = $pricee['id'];
                        $partner_insert = "UPDATE  `ticket_prices` SET
                        price = '$price',
                        park_price ='$parkPrice'
                        WHERE id='$price_id'";
                    }
                    else{
                        $partner_insert = "INSERT INTO `ticket_prices` (date, price, ticket_id,park_price)
                        VALUES ('$dte','$price','$ticketId','$parkPrice')";
                    }
                    try {
                    mysqli_query($db, $partner_insert);
                        $_SESSION['success'] = 'The data has been saved successfully.';
                    } catch (Exception $e) {
                        $errors['error'] = mysqli_error($db);
                    }
                }
    
                
            }
        }
        header('Location: TicketPrices.php?ticket_id='.$ticket_id);
        exit;
    }
}
else{
    $_SESSION['errors']['error'] = "Ticket ID not found";
    header('Location: TicketsDetails.php');
}
include '../includes/header.php';
?>



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
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
.select2-container {
    width: 100% !important;
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


              
                <!-- <a href="../messages/compose_message.php" class="btn btn-secondary">Send Message</a>  -->
                </div>

            </div>

        </div>
     

        <div class="row">

            <div class="col-md-12">

                <div class="card rounded shadow">
                    <div class="card-header">
                        <h4><?=isset($ticketData)? $ticketData['ticket_name']:'Add Price'?></h4>
                    </div>
                    <form action="" class="" id="PircesForm" autocomplete='off' autocomplete='off' method="post">
                        <input type="hidden" value="<?=$ticket_id?>" name="ticket_id">
                        <div class="card-body rowAppend">
                        
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Date</label>
                                        <input type="date" name="date[]" required class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Ours</label>
                                        <input type="number" step="0.01" class="form-control" required name="price[]">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Park</label>
                                        <input type="number" step="0.01" class="form-control" required name="park_price[]">
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button type="button" class="btn btn-sm btn-primary float-right" id="addMore">Add Row <i class="fa fa-plus"></i>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <select id="select2" name="ticketsIds[]" nameclass="form-control" multiple="multiple">
                                            <option></option>
                                            <?php foreach($allTickets as $ticket){ ?>
                                                <option value="<?=$ticket['id']?>"><?=$ticket['ticket_name']?></option>
                                            <?php } ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="submit" name="addPrice" class="btn btn-success float-right">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script>
    $(function(){
        $("#select2").select2({
    placeholder: "Select Tickets",
    allowClear: true
});
        $("#addMore").on('click',function(){
            var lastRow = $('.rowAppend').children('.row').last();
            var lastDate = lastRow.find('input[name="date[]"]').val();
            let lastDateFormat = new Date(lastDate);
            lastDateFormat.setDate(lastDateFormat.getDate() + 2);
            let FormattedDate = formatDate(lastDateFormat)
            if (lastDate == null || lastDate=='') {
                alert("Please first fill the fields");
                return;
            }
            else{
                jQuery(".rowAppend").append(`
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="font-weight-bold">Date</label>
                                <input type="date" value="${FormattedDate}" name="date[]" required class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="font-weight-bold">Ours</label>
                                <input type="number" step="0.01" class="form-control" required name="price[]">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="font-weight-bold">Park</label>
                                <input type="number" step="0.01" class="form-control" required name="park_price[]">
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-group">
                                <button type="button" class="btn btn-danger btn-sm remove-row"><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                `);
                scrollToBottom();
            }
        });
        $("body").on('click','.remove-row',function(){
            $(this).closest('.row').remove();
        })
        function scrollToBottom() {
            $('html, body').animate({ scrollTop: $(document).height() }, 'fast');
        }
        function formatDate(date) {
            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            return year + '-' + month + '-' + day;
        }
    })
</script>
</body>
</html>
