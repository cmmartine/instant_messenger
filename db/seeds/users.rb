# frozen_string_literal: true

module Seeds
  class Users
    def seed_mass_factory_users!
      50.times { FactoryBot.create(:user) }
    end

    def seed_test_user1_with_buddies!
      test_user1 = User.find_by(username: 'test_user1')
      all_users = User.all

      all_users.each do |user|
        next if skip_associated_model_creation?(user)

        Request.create!(sending_user_id: user.id, receiving_user_id: test_user1.id, status: 'accepted')
        Buddy.create!(user_id: user.id, buddy_id: test_user1.id)
        Buddy.create!(user_id: test_user1.id, buddy_id: user.id)
      end
    end

    def seed_test_user2_with_requests!
      test_user2 = User.find_by(username: 'test_user2')
      all_users = User.all

      all_users.each do |user|
        next if skip_associated_model_creation?(user)

        Request.create!(sending_user_id: user.id, receiving_user_id: test_user2.id, status: 'pending')
      end
    end

    private

    def skip_associated_model_creation?(user)
      user.username == 'test_user1' || user.username == 'test_user2' || user.username == 'Chatbot'
    end
  end
end
