python_dependencies:
  pkg.installed:
    - pkgs:
      - build-essential
      - git
      - libssl-dev
      - libffi-dev
      - libbz2-dev
      - libsqlite3-dev
      - libreadline-dev
      - openssl
      - make
      - python-pip
      - python-dev
      - python-setuptools
      - python-smbus
      - zlib1g-dev

install_py3.5:
  archive.extracted:
    - name: /tmp/
    - source: https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tgz
    - archive_format: tar
    - tar_options: v
    - if_missing: /tmp/Python-3.5.0/
  cmd.run:
    - name: ./configure && make && make install
    - cwd: /tmp/Python-3.5.0/
    - require:
      - archive: install_py3.5


npm_install:
  cmd.wait:
    - name: npm install
    - watch:
      - pkg: install_js_dependencies

link_node:
  cmd.wait:
    - name: ln -s /usr/bin/nodejs /usr/bin/node
    - watch:
      - cmd: npm_install


install_js_dependencies:
  pkg.installed:
    - pkgs:
      - nodejs
      - npm


install_icecast:
  pkg.installed:
    - pkgs:
      - icecast2

install_nginx:
  pkg.installed:
    - name: nginx


install_supervisor:
  pkg.installed:
    - name: supervisor