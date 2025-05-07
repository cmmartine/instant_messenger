# frozen_string_literal: true

module Seeds
  class Users
    def seed_mass_factory_users!
      50.times { FactoryBot.create(:user) }
    end
  end
end
