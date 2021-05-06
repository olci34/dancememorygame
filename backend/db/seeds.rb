p1 = Player.create(rank: 2, name:"olci", highest_score: 30000)
p2 = Player.create(rank: 3, name:"ali", highest_score: 29411)
p3 = Player.create(rank: 1, name:"mehmet", highest_score: 40000)

g1 = Game.create(card_number: 6, click_number: 20, score: 30000, player_id: 1)
g2 = Game.create(card_number: 4, click_number: 14, score: 28571, player_id: 1)
g3 = Game.create(card_number: 10, click_number: 34, score: 29411, player_id: 2)
g4 = Game.create(card_number: 6, click_number: 18, score:  33333, player_id: 3)
g5 = Game.create(card_number: 6, click_number: 16, score:  37500, player_id: 3)
g6 = Game.create(card_number: 4, click_number: 10, score:  40000, player_id: 3)


