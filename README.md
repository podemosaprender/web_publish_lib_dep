# nextjs-github
Sitios en gitpages usando nextjs y github actions

## Uso básico

1. Fork en github de XXX:Repo_modelo_con_actions
2. Habilitarle Gitpages XXX:Video_habilitar_gitpages
3. Puedo: 
   * Crear Markdown desde la web de Github
   * Guardar desde Colab

## Customizar

Puedo:
  * Editar `config.json` para cambiar footer y links en la barra de navegación.
  * Subir `logo.png`
  * Editar `sources.json` para agregar otros repos que me gustaría traer con documentos.

## Uso Intermedio

Puedo subir `page.js` y usar más Javascript y NextJS

## Uso Avanzado

En vez del XXX:Repo_modelo_con_actions puedo clonar este repo y trabajar sobre Next.

## Como funciona

Hay dos repos de github.

1. RepoDocumentos *(Con los documentos y configuración de cada blog)*
2. RepoGenerador *(Con el código para generar el mismo para todos)*

Este es el RepoGenerador, para crear un RepoDocumentos hay que hacer fork de uno que tenga las acciones que pusimos en `poner_en_repo_docs`

RepoDocumentos necesita tener Github Actions que: 

1. Cree la máquina virtual con NodeJS, Python, Java y GraphViz.
2. Hagan clone de este RepoGenerador
3. Ejecuten `src/bin/build.sh`
4. Despleguen el GitPages 