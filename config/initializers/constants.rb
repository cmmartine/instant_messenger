# frozen_string_literal: true

Rails.application.config.before_initialize do
  constants_module = Object.const_set('Constants', Module.new)
  constants_folder = '/app/javascript/constants/*'

  Dir.glob(File.join(Rails.root, constants_folder)).each do |file_path|
    constant_name = file_path.split('/').last.split('.').first
    file_contents = JSON.parse(File.read(file_path))
    constants_module.const_set(constant_name, file_contents)
  end
end
