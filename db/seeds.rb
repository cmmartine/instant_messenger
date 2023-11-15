# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
user1 = User.create!(username: 'Alfred', email: 'alfred1@chatroom.com', password: 'Alfred1!', password_confirmation: 'Alfred1!')

user2 = User.create!(username: 'Bianca', email: 'bianca1@chatroom.com', password: 'Bianca1!', password_confirmation: 'Bianca1!')

chatroom1 = Chatroom.create!(active_status: true)
user1.chatrooms << chatroom1
user2.chatrooms << chatroom1

Message.create!(body: 'Hello', read_status: false, user_id: 1, chatroom_id: 1)