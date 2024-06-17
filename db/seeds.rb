# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
user1 = User.create!(username: 'Alfred', email: 'alfred1@chatroom.com', password: 'Alfred1!', password_confirmation: 'Alfred1!')
user2 = User.create!(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')
user3 = User.create!(username: 'Cleetus', email: 'cleetus1@chatroom.com', password: 'Cleetus1!', password_confirmation: 'Cleetus1!')
user4 = User.create!(username: 'Diana', email: 'diana1@chatroom.com', password: 'Diana12!', password_confirmation: 'Diana12!')
user5 = User.create!(username: 'Evelyn', email: 'evelyn1@chatroom.com', password: 'Evelyn1!', password_confirmation: 'Evelyn1!')
user6 = User.create!(username: 'Freddy', email: 'freddy1@chatroom.com', password: 'Freddy1!', password_confirmation: 'Freddy1!')

chatroom1 = Chatroom.create!(active_status: true)
user1.chatrooms << chatroom1
user2.chatrooms << chatroom1

Message.create!(body: 'Hello', read_status: true, user_id: user1.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Hey!', read_status: false, user_id: user2.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Whats up?', read_status: true, user_id: user1.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Not much just hanging out, you?', read_status: false, user_id: user2.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Just waiting for Bruce to come back', read_status: true, user_id: user1.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Oh whos that?', read_status: false, user_id: user2.id, chatroom_id: chatroom1.id)
Message.create!(body: 'A good friend of mine, I help maintain his cave', read_status: true, user_id: user1.id, chatroom_id: chatroom1.id)
Message.create!(body: 'That sounds very cool, what do you do in this cave?', read_status: false, user_id: user2.id, chatroom_id: chatroom1.id)
Message.create!(body: 'Mostly just watch movies, currently watching Batman Begins', read_status: true, user_id: user1.id, chatroom_id: chatroom1.id)
Message.create!(body: 'I love that movie!', read_status: false, user_id: user2.id, chatroom_id: chatroom1.id)

chatroom2 = Chatroom.create!(active_status: true)
user1.chatrooms << chatroom2
user3.chatrooms << chatroom2

Message.create!(body: 'Room #2!', read_status: true, user_id: user3.id, chatroom_id: chatroom2.id)
Message.create!(body: 'Room 2 Buddies!', read_status: true, user_id: user1.id, chatroom_id: chatroom2.id)
Message.create!(body: 'Yea!', read_status: true, user_id: user3.id, chatroom_id: chatroom2.id)
