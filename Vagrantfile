VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.forward_agent = true
  config.vm.box = "bento/ubuntu-18.04"
  config.vm.synced_folder "~/.identity", "/home/vagrant/.identity", create: true
  config.vm.provision "shell", path: "https://s3-us-west-1.amazonaws.com/raptr-us-west-1/baseline/roles/vagrant"

  # box-specific
  config.vm.provision "shell", inline: "apt-get update && apt-get install -y npm"

  config.vm.provision "shell", inline: "cd /vagrant && npm i"
  config.vm.provision "shell", inline: "echo _auth = $NPM_AUTH_TOKEN > ~/.npmrc"
  config.vm.provision "shell", inline: "echo email = $NPM_EMAIL >> ~/.npmrc"
end
