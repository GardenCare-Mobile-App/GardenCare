# 🌱 GardenCare — Sistema Inteligente de Monitoramento e Cuidado de Plantas

**Plataforma integrada de IoT, identificação botânica e comunidade colaborativa**

O **GardenCare** é um sistema composto por um **módulo físico com sensores (ESP32)** e um **aplicativo mobile (React Native)** que permite o monitoramento ambiental contínuo de plantas, a identificação automática de espécies por fotografia e a troca de experiências entre usuários em um feed colaborativo.

**Público-Alvo:** Biólogos, agrônomos, pesquisadores, estudantes universitários, jardineiros domésticos e agricultores urbanos.

| Capacidade | Benefício |
| :--- | :--- |
| **Monitoramento em Tempo Real** | Coleta contínua de umidade, temperatura, luminosidade e umidade do ar via sensores. |
| **Identificação de Espécies** | Reconhecimento automático de plantas por fotografia, apoiando pesquisa e catalogação. |
| **Alertas Inteligentes** | Notificações automáticas quando os parâmetros ambientais saem da faixa ideal. |
| **Comunidade Colaborativa** | Feed onde usuários compartilham dados, progresso de cultivos e dicas entre si. |

---

## 1. ⚙️ Especificações Técnicas

### 1.1. Aplicativo Mobile

| Parâmetro | Detalhe |
| :--- | :--- |
| **Framework** | React Native (multiplataforma Android e iOS) |
| **Arquitetura** | MVVM (Model-View-ViewModel) |
| **Estilização** | Styled Components + React Native Paper |
| **Navegação** | React Native Navigation |
| **Backend / Auth** | Firebase (autenticação e banco de dados em tempo real) |
| **Requisições HTTP** | Axios |
| **Câmera** | Expo Camera |
| **Identificação botânica** | API externa de reconhecimento de plantas |

### 1.2. Módulo Físico (Hardware)

| Parâmetro | Detalhe |
| :--- | :--- |
| **Microcontrolador** | ESP32 |
| **Sensor de umidade do solo** | Capacitivo |
| **Sensor de temperatura e umidade do ar** | DHT11 / DHT22 |
| **Sensor de luminosidade** | LDR |
| **Protocolo de transmissão** | Wi-Fi (HTTP / MQTT) |

---

## 2. 🧩 Faixas Ideais Monitoradas

Os alertas são disparados automaticamente quando qualquer parâmetro sai da faixa configurada.

| Parâmetro | Faixa Ideal | Unidade | Sensor |
| :--- | :--- | :--- | :--- |
| **Luminosidade** | 500 a 1000 | LUX | LDR |
| **Temperatura** | 18 a 25 | °C | DHT11/DHT22 |
| **Umidade do solo** | 40 a 60 | % | Capacitivo |
| **Umidade do ar** | — | % | DHT11/DHT22 |

---

## 3. 👥 Atores e Casos de Uso

Descrição de cada ator do sistema e as funcionalidades com as quais ele interage.

### 🟢 Usuário

Pessoa cadastrada no aplicativo — jardineiro, estudante, pesquisador ou qualquer entusiasta de plantas.

| Caso de Uso |
| :--- |
| Cadastrar conta / fazer login |
| Cadastrar planta |
| Visualizar dados dos sensores |
| Receber alertas de condições inadequadas |
| Identificar espécie por foto |
| Publicar no feed comunitário |
| Comentar e curtir publicações |
| Visualizar histórico de leituras |
| Exportar relatório de monitoramento |

### 🟩 Administrador

Responsável pela gestão da plataforma e pela configuração dos parâmetros do sistema.

| Caso de Uso |
| :--- |
| Gerenciar usuários |
| Moderar conteúdo do feed |
| Configurar parâmetros ideais (luminosidade 500–1000 LUX, temperatura 18–25 °C, umidade 40–60%) |
| Visualizar relatórios gerais |

### 🟡 Planta / Módulo ESP32

Ator não humano que representa o hardware embarcado responsável pela coleta e envio de dados.

| Caso de Uso |
| :--- |
| Transmitir leituras dos sensores via Wi-Fi |
| Acionar alerta automático ao detectar condição fora do ideal |

### 🔵 API de Reconhecimento de Plantas

Serviço externo acionado pelo aplicativo para identificação de espécies.

| Caso de Uso |
| :--- |
| Receber foto e retornar identificação da espécie |

### 🔶 Firebase

Serviço externo responsável por autenticação e persistência dos dados.

| Caso de Uso |
| :--- |
| Autenticar usuário |
| Armazenar e sincronizar dados em tempo real |

---

## 4. 🗃️ Modelagem de Dados

### 4.1. 🌿 Entidade: Planta

Representa cada planta cadastrada pelo usuário, associada ao seu módulo sensor.

| Campo | Tipo | Descrição | Restrição |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único da planta. | PK, auto-gerado. |
| `id_usuario` | `string` | ID do usuário dono da planta. | FK (`usuarios.id`), obrigatório. |
| `nome` | `string` | Nome dado pelo usuário à planta. | Obrigatório. |
| `especie` | `string` | Nome da espécie identificada. | Opcional (`null`). |
| `data_cadastro` | `string` | Data de cadastro no sistema. | Auto-gerado. ISO (`YYYY-MM-DD`). |
| `foto_url` | `string` | URL da foto enviada para identificação. | Opcional (`null`). |

### 4.2. 📡 Entidade: Leitura de Sensor

Registra cada leitura transmitida pelo módulo ESP32.

| Campo | Tipo | Descrição | Restrição | Unidade |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único da leitura. | PK, auto-gerado. | — |
| `id_planta` | `string` | Planta associada à leitura. | FK (`plantas.id`), obrigatório. | — |
| `umidade_solo` | `number` | Umidade do solo medida. | Opcional (`null`). | % |
| `temperatura` | `number` | Temperatura do ambiente. | Opcional (`null`). | °C |
| `umidade_ar` | `number` | Umidade relativa do ar. | Opcional (`null`). | % |
| `luminosidade` | `number` | Nível de luminosidade. | Opcional (`null`). | LUX |
| `timestamp` | `string` | Data e hora da leitura. | Auto-gerado. | ISO (`YYYY-MM-DDTHH:mm:ssZ`) |

### 4.3. 👤 Entidade: Usuário

Representa qualquer pessoa cadastrada no aplicativo.

| Campo | Tipo | Descrição | Restrição |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único. | PK, auto-gerado (Firebase Auth). |
| `nome` | `string` | Nome completo. | Obrigatório. |
| `email` | `string` | E-mail de acesso. | Obrigatório, único. |
| `perfil` | `string` | Tipo de usuário. | Ex: `"Pesquisador"`, `"Jardineiro"`, `"Estudante"`. |
| `data_cadastro` | `string` | Data de criação da conta. | Auto-gerado. ISO (`YYYY-MM-DD`). |

### 4.4. 📰 Entidade: Publicação (Feed)

Armazena as postagens da comunidade, podendo incluir dados reais de sensores.

| Campo | Tipo | Descrição | Restrição |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Identificador único da publicação. | PK, auto-gerado. |
| `id_usuario` | `string` | Autor da publicação. | FK (`usuarios.id`), obrigatório. |
| `id_planta` | `string` | Planta relacionada (opcional). | FK (`plantas.id`), opcional (`null`). |
| `conteudo` | `string` | Texto da publicação. | Obrigatório. |
| `foto_url` | `string` | Imagem anexada à publicação. | Opcional (`null`). |
| `data_publicacao` | `string` | Data e hora da postagem. | Auto-gerado. ISO (`YYYY-MM-DDTHH:mm:ssZ`). |

### 4.5. 🔗 Relacionamentos

| Relação | Tipo | Chave Estrangeira | Integridade |
| :--- | :--- | :--- | :--- |
| **Usuário possui Plantas** | 1:N | `plantas.id_usuario` | Obrigatória. |
| **Planta gera Leituras** | 1:N | `leituras.id_planta` | Obrigatória. A exclusão da planta remove as leituras em cascata. |
| **Usuário faz Publicações** | 1:N | `publicacoes.id_usuario` | Obrigatória. |
| **Planta aparece em Publicações** | 1:N | `publicacoes.id_planta` | Opcional. |

---

## 5. 📱 Funcionalidades do Aplicativo

### 5.1. Monitoramento Ambiental

- Exibição em tempo real dos dados enviados pelo módulo ESP32 (umidade do solo, temperatura, umidade do ar e luminosidade).
- Histórico de leituras com gráficos de evolução ao longo do tempo.
- Painel individual por planta.

### 5.2. Identificação de Espécies

- Captura de foto diretamente pelo aplicativo via **Expo Camera**.
- Envio da imagem para a API de reconhecimento de plantas.
- Retorno com nome da espécie, família botânica e informações de cuidado.

### 5.3. Sistema de Alertas

Os alertas são enviados como notificações push sempre que uma leitura do sensor sair da faixa ideal configurada.

| Condição detectada | Mensagem de alerta |
| :--- | :--- |
| Luminosidade < 500 LUX | "Sua planta está com pouca luz. Considere movê-la." |
| Luminosidade > 1000 LUX | "Luminosidade muito alta. Proteja sua planta do sol direto." |
| Temperatura < 18 °C | "Temperatura baixa detectada. Leve a planta para um local mais aquecido." |
| Temperatura > 25 °C | "Temperatura acima do ideal. Verifique a ventilação do ambiente." |
| Umidade do solo < 40% | "Solo seco. É hora de regar a planta." |
| Umidade do solo > 60% | "Solo muito úmido. Reduza a frequência de rega." |

### 5.4. Feed Colaborativo

- Publicação de posts com texto e foto.
- Compartilhamento opcional de dados reais dos sensores na publicação.
- Curtidas e comentários entre usuários.
- Banco de dados colaborativo com valor científico e educacional.

---

## 6. 🏗️ Arquitetura do Sistema

```
┌─────────────────┐        Wi-Fi (HTTP)       ┌──────────────────────┐
│   Módulo ESP32  │ ─────────────────────────▶ │   Firebase Realtime  │
│  (sensores)     │                            │   Database           │
└─────────────────┘                            └──────────┬───────────┘
                                                          │
                                               ┌──────────▼───────────┐
                                               │  Aplicativo Mobile   │
                                               │  (React Native)      │
                                               └──────────┬───────────┘
                                                          │
                                    ┌─────────────────────▼──────────────────────┐
                                    │           API de Reconhecimento            │
                                    │           de Plantas (externa)             │
                                    └────────────────────────────────────────────┘
```

---

## 7. 👥 Equipe

| Nome | Função |
| :--- | :--- |
| Maria Eduarda Braga | Desenvolvimento |
| Julia Ávila | Desenvolvimento |
| Gustavo Monteiro | Desenvolvimento |
| Aryelle Pereira | Desenvolvimento |

**Disciplina:** Dispositivos Móveis e Robótica Aplicada

---

## 8. 📋 Como executar o projeto

### Pré-requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Conta no Firebase
- Dispositivo ESP32 com sensores montados

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gardencare.git

# Acesse a pasta do projeto
cd gardencare

# Instale as dependências
npm install

# Inicie o aplicativo
npx expo start
```

### Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Ative **Authentication** (e-mail/senha) e **Realtime Database**.
3. Copie as credenciais para o arquivo `src/config/firebase.js`.

### Configuração do ESP32

1. Instale a [Arduino IDE](https://www.arduino.cc/en/software) com suporte ao ESP32.
2. Carregue o sketch da pasta `/firmware` no microcontrolador.
3. Configure o SSID, senha do Wi-Fi e a URL do Firebase no arquivo de configuração do firmware.

---
## 9. 📊 Avaliação do Projeto

| Instrumento | Método |
| :--- | :--- |
| **Satisfação dos usuários** | Questionários com escala Likert (1–5) via Google Forms. |
| **Precisão dos sensores** | Comparação com instrumentos calibrados (higrômetro, termômetro, luxímetro). |
| **Eficácia dos alertas** | Acompanhamento longitudinal da saúde das plantas monitoradas pelo sistema. |
