VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.ssh.forward_agent = true
  config.vm.box = "boxcutter/ubuntu1604"
  config.vm.synced_folder "~/.identity", "/home/vagrant/.identity", create: true
  config.vm.provision "shell", path: "https://s3-us-west-1.amazonaws.com/raptr-us-west-1/bootstrap"

  # box-specific
  config.vm.provision "shell", inline: "sudo apt-get install -y npm"
  config.vm.provision "shell", inline: "sudo ln -s /usr/bin/nodejs /usr/bin/node"
  config.vm.provision "shell", inline: "sudo npm install mocha -g"
end