# GardenCare

Aplicativo mobile de monitoramento de plantas com integração IoT (ESP32), identificação de espécies por foto e feed colaborativo entre usuários.

---

## Como rodar o app

### Pré-requisitos

- Node.js instalado
- Expo Go instalado no celular (Android ou iOS)
- Conta no Firebase com Realtime Database e Authentication ativados

### Instalação

```bash
# Clone o repositório
git clone https://github.com/GardenCare-Mobile-App/GardenCare.git
cd GardenCare

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais do Firebase:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=
EXPO_PUBLIC_PLANT_ID_API_KEY=
```

### Rodando

```bash
npx expo start
```

Escaneie o QR Code com o Expo Go no celular.

---

## Como funciona

### Monitoramento com ESP32

O ESP32 coleta dados dos sensores e envia para o Firebase Realtime Database. O app escuta em tempo real e exibe os valores atualizados automaticamente.

| Sensor | Dado coletado |
| :--- | :--- |
| DHT11/DHT22 | Temperatura (°C) e Umidade do ar (%) |
| Capacitivo | Umidade do solo (%) |
| LDR | Luminosidade (Claro / Escuro) |

**Comunicação bidirecional:** o app pode solicitar uma nova leitura ao ESP32 escrevendo no nó `/comandos` do Firebase. O ESP32 lê o comando e responde com os dados atualizados em `/sensores`.

### Alertas inteligentes

Notificações push são enviadas automaticamente quando os sensores detectam condições fora do ideal:

- Temperatura muito alta ou muito baixa
- Umidade do solo abaixo do mínimo
- Plantas no escuro por mais de 12 horas seguidas

### Identificação de plantas

Tire uma foto de qualquer planta e o app consulta a API do Plant.id para identificar a espécie, retornando nome científico, família botânica e dicas de cuidado.

### Feed da comunidade

Usuários podem publicar posts com texto e foto, curtir e comentar publicações de outros usuários. Ao tocar em um post é possível ver os detalhes completos.

### Meu Jardim

Cadastre suas plantas, acompanhe o status de saúde de cada uma (saudável, atenção, crítico) com base nos dados dos sensores e gerencie favoritos.

---

## Tecnologias

| Camada | Tecnologia |
| :--- | :--- |
| Mobile | React Native + Expo |
| Arquitetura | MVVM |
| Backend | Firebase (Auth, Firestore, Realtime Database, Storage) |
| Notificações | Expo Notifications |
| Identificação | API Plant.id |
| Hardware | ESP32 + Arduino IDE |

---

## Configuração do ESP32

1. Abra a [Arduino IDE](https://www.arduino.cc/en/software) com suporte ao ESP32 instalado
2. Abra o sketch da pasta `/firmware`
3. Configure o SSID, senha do Wi-Fi e URL do Firebase no topo do arquivo
4. Faça o upload para o ESP32

---

## Testes

```bash
npm test
```

Os testes cobrem ViewModels (unitários) e componentes de UI.

---

## Equipe

| Nome | Função |
| :--- | :--- |
| Gustavo Monteiro | Desenvolvimento |
| Maria Eduarda Braga | Desenvolvimento |
| Julia Ávila | Desenvolvimento |
| Aryelle Pereira | Desenvolvimento |

**Disciplina:** Dispositivos Móveis e Robótica Aplicada
