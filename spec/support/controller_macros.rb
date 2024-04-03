module ControllerMacros
  def login_user
    before(:each) do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      user = FactoryBot.create(:user)
      sign_in user
    end
  end

  def create_second_user
    before(:each) do
      FactoryBot.create(:user)
    end
  end
end
