# GitHub Pages Deployment Guide

Este projeto está configurado para deploy automático no GitHub Pages.

## 🚀 Como Habilitar

### Passo 1: Configurar GitHub Pages

1. Vá para o repositório no GitHub: https://github.com/rgessele/sauron
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Build and deployment**:
   - Source: Selecione **GitHub Actions**
5. Salve as configurações

### Passo 2: Fazer Merge/Push para Main

O deploy acontecerá automaticamente quando:
- Você fizer merge deste PR para a branch `main`, OU
- Fizer push direto para a branch `main`

### Passo 3: Aguardar Deploy

1. Vá para a aba **Actions** no repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde a conclusão (leva cerca de 1-2 minutos)
4. Quando o ícone ficar verde ✅, o deploy foi concluído

### 🌐 URL do Site

Após o deploy, o site estará disponível em:

**https://rgessele.github.io/sauron/**

## 🔄 Deploy Automático

Toda vez que você fizer push para a branch `main`, o GitHub Actions irá:

1. ✅ Instalar as dependências
2. ✅ Fazer o build do projeto
3. ✅ Fazer deploy automático para GitHub Pages

## 🛠️ Testando Localmente Antes do Deploy

Para testar como ficará no GitHub Pages:

```bash
# Build do projeto
npm run build

# Preview local (simula o servidor de produção)
npm run preview
```

O preview estará disponível em `http://localhost:4173/sauron/`

## ⚙️ Configuração Técnica

### Vite Config
O `vite.config.ts` foi configurado com:
```typescript
base: '/sauron/'
```

Isso garante que todos os assets (CSS, JS, imagens) sejam carregados corretamente no caminho `/sauron/` do GitHub Pages.

### GitHub Actions Workflow
O arquivo `.github/workflows/deploy.yml` configura:
- Build automático
- Deploy para GitHub Pages
- Execução em cada push para `main`

## ❓ Troubleshooting

### O site não carrega
- Verifique se GitHub Pages está habilitado em Settings → Pages
- Confirme que a source está como "GitHub Actions"
- Verifique a aba Actions para ver se o workflow concluiu com sucesso

### Assets não carregam (404)
- Certifique-se de que o `base: '/sauron/'` está configurado no `vite.config.ts`
- Faça rebuild e novo deploy

### Workflow não executa
- Verifique se você tem permissões de escrita no repositório
- Confirme que o workflow está na branch `main`
