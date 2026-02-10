# Node.js の公式イメージを使う
FROM node:20-alpine


# 作業ディレクトリを作る
WORKDIR /app

# package.json だけ先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのファイルをコピー
COPY . .

# Next.js の開発サーバーポート
EXPOSE 3000

# 起動コマンド
CMD ["npm", "run", "dev"]
