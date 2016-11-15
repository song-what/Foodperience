require "tmpdir"
require "bundler/setup"
require "jekyll"

SOURCE = "."
DESTINATION = "_dist"
CONFIG = "_dist.yml"
ASSETS = "assets"
BASE_URL = "/_Resources/Static/Packages/Vendor.Site/Assets"

JEKYLL_DEFAULT = {
  source: SOURCE,
  destination: DESTINATION,
  config: CONFIG,
  quiet: true
}

def confirm(message="Are you sure?")
  if auto_confirm
    yield
    return
  end

  print "#{message} (Y/N): "
  input = STDIN.gets.chomp
  input.upcase == "Y" ? yield : puts("Skipping")
end

def auto_confirm
  @auto_confirm ||= false
end

def jekyll_config
  @jekyll_config || {}
end

desc "Build site"
task :build do
  print "Building site... "
  options = JEKYLL_DEFAULT.merge jekyll_config
  Jekyll::Site.new(Jekyll.configuration(options)).process
  print "done\n"
end

task :confirm do
  @auto_confirm = true
end

namespace :neos do
  task :jekyll do
    @jekyll_config = {
      assets: {
        baseurl: BASE_URL
      }
    }
  end

  desc "Export assets (NEOS_ASSETS=)"
  task assets: [:jekyll, :build] do
    site_package = ENV['NEOS_ASSETS'] || "_neos/assets"

    if Dir.exists? site_package
      confirm("Remove existing assets (from #{site_package})?") do
        FileUtils.rm_r site_package
      end
    end

    print "Exporting assets... "
    FileUtils.mkdir_p site_package
    FileUtils.cp_r(File.join(DESTINATION, ASSETS, "/", "."), File.join(site_package))
    print "done\n"
  end

  desc "Watch assets (NEOS_ASSETS=)"
  task watch: [:confirm, :assets] do
    system %{fswatch -o _assets/ | xargs -n1 -I {} rake confirm neos:assets}
  end
end

task default: :build
