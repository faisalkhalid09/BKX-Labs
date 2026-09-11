board = [' ' for _ in range(9)]

player = 'X'
opponent = 'O'

def check_win(board, player):
    winning_positions = [
        (0, 1, 2),
        (3, 4, 5),
        (6, 7, 8),
        (0, 3, 6),
        (1, 4, 7),
        (2, 5, 8),
        (0, 4, 8),
        (2, 4, 6)
    ]

    for a, b, c in winning_positions:
        if board[a] == board[b] == board[c] == player:
            return True

    return False

def is_board_full(board):
    return ' ' not in board

def evaluate(board):
    if check_win(board, player):
        return 100

    if check_win(board, opponent):
        return -100

    score = 0

    winning_positions = [
        (0, 1, 2),
        (3, 4, 5),
        (6, 7, 8),
        (0, 3, 6),
        (1, 4, 7),
        (2, 5, 8),
        (0, 4, 8),
        (2, 4, 6)
    ]

    for a, b, c in winning_positions:
        line = [board[a], board[b], board[c]]

        if line.count(player) == 2 and line.count(' ') == 1:
            score += 10

        elif line.count(opponent) == 2 and line.count(' ') == 1:
            score -= 10

        elif line.count(player) == 1 and line.count(' ') == 2:
            score += 1

        elif line.count(opponent) == 1 and line.count(' ') == 2:
            score -= 1

    if board[4] == player:
        score += 3

    elif board[4] == opponent:
        score -= 3

    return score

def minimax(board, depth, maximizing_player, max_depth):
    if check_win(board, player):
        return 100

    if check_win(board, opponent):
        return -100

    if is_board_full(board):
        return 0

    if depth == max_depth:
        return evaluate(board)

    if maximizing_player:
        best_score = float('-inf')

        for i in range(9):
            if board[i] == ' ':
                board[i] = player
                score = minimax(board, depth + 1, False, max_depth)
                board[i] = ' '
                best_score = max(best_score, score)

        return best_score

    else:
        best_score = float('inf')

        for i in range(9):
            if board[i] == ' ':
                board[i] = opponent
                score = minimax(board, depth + 1, True, max_depth)
                board[i] = ' '
                best_score = min(best_score, score)

        return best_score

def find_best_move(board, max_depth=4):
    best_score = float('-inf')
    best_move = -1

    for i in range(9):
        if board[i] == ' ':
            board[i] = player
            score = minimax(board, 0, False, max_depth)
            board[i] = ' '

            print("Position:", i + 1, "Score:", score)

            if score > best_score:
                best_score = score
                best_move = i

    return best_move

best_move = find_best_move(board, 4)

print("Best Move:", best_move + 1)