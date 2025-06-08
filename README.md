# Portfolio Vagner Bom Jesus

Este projeto é um portfolio pessoal responsivo do Vagner Bom Jesus.
Apresenta informações de perfil, redes sociais, links para aplicações, publicações, artigos, recursos de formação e inclui um sistema de paginação para mostrar muitos recursos de forma elegante.

## Funcionalidades

* **Design moderno e limpo** (HTML5 + CSS3 + Bootstrap 5)
* **Modo claro e escuro** (toggle com persistência)
* **Layout desktop em duas colunas** (perfil à esquerda, links/paginação à direita)
* **Layout mobile em coluna única**
* **Paginação customizada** para os recursos
* **Totalmente responsivo**
* **Links abrem em nova aba**
* **Dados facilmente editáveis em JS**

## Estrutura do Projeto

```
- index.html          # Ficheiro principal com todo o código
- README.md           # Este ficheiro
```

## Como usar

1. **Faz download ou clona o repositório:**

   ```bash
   git clone https://github.com/VagnerBomJesus/vagnerbomjesus.github.io.git
   ```
2. **Abre o ficheiro `index.html` num browser moderno.**
3. **(Opcional) Personaliza os recursos no array `resources` do JavaScript.**

## Testes

Este projeto utiliza **Jest** para verificar a paginacao.

```bash
npm test
```


## Personalização

* **Adicionar recursos:**
  Basta editar/adicionar objetos no array `resources` (título, descrição, link).
* **Alterar perfil:**
  Altera o HTML na coluna do perfil (avatar, nome, role, botões, etc).
* **Alterar cores:**
  Personaliza diretamente o CSS do ficheiro.

## Modo escuro

* O botão no canto superior direito alterna entre modo claro e escuro.
* O estado é guardado no `localStorage`.

## Créditos

Desenvolvido por [Vagner Bom Jesus](https://www.linkedin.com/in/vagnerbomjesus)

---

### Demonstração

Basta abrir o ficheiro `index.html` em qualquer browser. Não precisa de backend.

---

## Exemplo de commit para o repositório

```sh
git add index.html README.md
git commit -m "Portfolio responsivo do Vagner Bom Jesus com modo escuro e paginação de recursos"
git push origin main
```
