# cartalog

Aplicação em Netuno para a deteção automática de matrículas e gestão de carros.

## Como funciona

![alt text](https://raw.githubusercontent.com/sitana-company/cartalog/master/docs/Cartalog.png)

## Instalação

#### Netuno

Instale o Netuno seguindo as instruções que podem ser encontradas aqui:

[Instalação do Netuno](https://doc.netuno.org/docs/comece/instalacao/)

#### Cartalog

Abra o terminal (console) e dentro da pasta onde o Netuno foi instalado, clone e projecto dentro da pasta `📂 web/apps`.

`git clone https://github.com/sitana-company/cartalog.git`

A pasta da aplicação Cartalog será criada: `📂 cartalog`

#### Docker

No Windows ou no Mac OS X instale o Docker Desktop, disponível em:

[Docker Desktop](https://www.docker.com/products/docker-desktop)

No Linux instale através do gestor de pacotes, como por exemplo:

* [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
* [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

#### OpenALPR

Instale no Docker o container do OpenALPR com o seguinte comando:

`docker build -t openalpr https://github.com/openalpr/openalpr.git`

##### Test

Faça o download da imagem de teste:

`wget http://plates.openalpr.com/h786poj.jpg`

E teste o container do OpenALPR:

`docker run -it --rm -v $(pwd):/data:ro openalpr -c eu h786poj.jpg`

##### Mac OS X

Defina a pasta que vai ser utilizada para processar as fotos com o container do OpenALPR, por exemplo:

`sudo mkdir /usr/local/openalpr-temp && sudo chown -R 777 /usr/local/openalpr-temp`

Agora no Docker Desktop adicione a pasta clicando com o botão direito do rato no icone do Docker na barra do topo do Mac OS X, depois aceda as _Preferences..._ e depois _File Sharing_, e adicione a pasta criada:

`📂 /usr/local/openalpr-temp`

#### Configure a Aplicação

Configure a aplicação dentro da pasta onde tem instalado o Netuno entre na pasta de configurações da aplicação, que está em:

`📂 NETUNO/web/apps/cartalog/config`

Vai encontrar o ficheiro da configuração de exemplo: `📂 _sample.json`

Copie ou renomeie para ser a configuração do ambiente de desenvolvimento, assim o nome final do ficheiro de configuração deverá ser:

`📂 _development.json`

Edite o ficheiro e ajuste as configurações que estão em `settings`, como:

```
    ...
    "settings": {
        "sms_token": "#####",
        "sms_to": "+351#######",
        "mail_to": "########@sitana.pt",
        "openalpr_temp_path": "/usr/local/openalpr-temp"
    }
    ...
```

## Iniciar

Através do terminal (console) e dentro da pasta ontem tem o Netuno instalado, inicie o servidor do Netuno utilizando como padrão a aplicação **cartalog**.

Com o seguinte o comando:

`./netuno server app=cartalog`

O frontend fica disponível em:

[http://localhost:9000/](http://localhost:9000/)

### Backoffice

O backoffice fica disponível em:

[http://localhost:9000/admin/](http://localhost:9000/admin/)

Os dados de acesso padrão é:

- utilizador: `dev`
- palavra-passe: `dev`

### API REST

A definição da API REST fica disponível em:

[http://localhost:9000/api/_openapi](http://localhost:9000/api/_openapi)

---

[netuno.org](https://www.netuno.org) by [sitana.pt](https://www.sitana.pt)
