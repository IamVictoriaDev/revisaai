# 📚 RevisaAí

> Um jeito simples de não esquecer o que você estudou.

---

## 💡 Sobre

O **RevisaAí** nasceu de um problema real: eu estudava, mas me perdia no que já tinha visto, no que precisava revisar e nas dúvidas que surgiam no meio do caminho.

Anotar em papel não funcionava, e apps muito complexos mais atrapalhavam do que ajudavam.

Então a ideia aqui foi simples: criar um **caderninho digital**, direto ao ponto, só com o que realmente ajuda no dia a dia.

---

## ⚙️ O que dá pra fazer

✔ Registrar conteúdos estudados
✔ Marcar conteúdos como revisados
✔ Anotar dúvidas durante o estudo
✔ Marcar dúvidas como resolvidas
✔ Registrar sessões de estudo (tempo + matéria)
✔ Usar IA como apoio (opcional)

---

## 🧠 Ideia do projeto

Ao invés de tentar criar um sistema cheio de funcionalidades, o foco foi:

* não complicar
* ser rápido de usar
* ajudar de verdade na organização

👉 Tudo que não ajudava diretamente nisso, eu preferi não colocar.

---

## 🛠️ Tecnologias

**Frontend**

* React
* TypeScript
* Tailwind CSS

**Backend**

* Node.js
* Express

**API**

* json-server (simulação de dados)

---

## 📁 Estrutura

```bash
revisaai/
├── src/
├── backend/
├── public/
├── README.md
├── PRD.md
```

---

## 🚀 Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Backend

```bash
cd backend
npm install
cd ..
```

### 3. (Opcional) Configurar IA

```bash
cp backend/.env.example backend/.env
```

---

### 4. Rodar o projeto

Abra 3 terminais:

```bash
# API (dados)
npm run api
```

```bash
# backend (IA)
npm run backend
```

```bash
# frontend
npm run dev
```

---

## 🌐 Acessar

```
http://localhost:5173
```

---

## 🔮 Próximas melhorias

* lembrete automático de revisão
* filtro por matéria
* visual de progresso
* persistência mais robusta

---

## 📌 Deploy

* Frontend: *(https://revisaai-tau.vercel.app)*
* API (dados): *(https://revisaai-api.onrender.com )*
---

## 📄 PRD

O planejamento do projeto está em:

```
PRD.md
```



## ✨ Final

Esse projeto não nasceu de uma ideia aleatória.

Nasceu de um problema que eu realmente tenho estudando.

E foi exatamente isso que eu tentei resolver aqui.
