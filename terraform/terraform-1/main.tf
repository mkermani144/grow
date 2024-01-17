# starting multiple containers on different hosts

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {
  alias = "remote"
  host  = "ssh://user@host:port"
}
provider "docker" {
  alias = "local"
}

resource "docker_image" "nginx" {
  name = "nginx"
}

resource "docker_container" "local-nginx" {
  provider = docker.local
  name     = "local-nginx"
  image    = docker_image.nginx.image_id
}

resource "docker_container" "remote-nginx" {
  provider = docker.remote
  name     = "remote-nginx"
  image    = docker_image.nginx.image_id
}

