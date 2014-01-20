Vagrant::Config.run do |config|
    config.vm.host_name = "jenkinslight"

    config.vm.box = "base-squeeze64-lamp-54"
    config.vm.box_url = "https://dl.dropbox.com/s/m3cnudvkwmayhwh/base-squeeze64-lamp-54.box?dl=1"

    config.vm.provision :shell, :path => "bootstrap.sh"

    config.vm.network :hostonly, "10.0.0.2", :netmask => "255.255.255.0"
    config.vm.share_folder("vagrant-root", "/vagrant", ".", :nfs => true)
    config.vm.forward_port 80, 8888

    config.vm.customize ["modifyvm", :id, "--memory", 1024]
    config.vm.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    config.vm.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
end