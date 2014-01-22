Vagrant::Config.run do |config|
    config.vm.host_name = "jenkinslight"

    config.vm.box = "precise32"
    config.vm.box_url = "http://files.vagrantup.com/precise32.box"

    config.vm.network :bridged
    config.vm.forward_port 9000, 8888

    config.vm.share_folder("vagrant-root", "/vagrant", ".", :nfs => true)

    config.vm.provision :shell, path: "manifests/bootstrap.sh"
    config.vm.provision :puppet do |puppet|
        puppet.module_path = "modules"
        puppet.manifests_path = "manifests"
        puppet.manifest_file  = "init.pp"
    end
end
