# frozen_string_literal: true

module Seeds
  class H2OAI
    def seed!
      ai_chatbot = User.new(username: 'Chatbot')
      ai_chatbot.save(validate: false)
    end
  end
end
