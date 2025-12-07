#!/bin/bash

# このスクリプトを実行して、このリポジトリだけ個人アカウントを使うように設定します

echo "📝 個人アカウント情報を入力してください"
read -p "GitHub個人アカウントの名前: " personal_name
read -p "GitHub個人アカウントのメールアドレス: " personal_email

# このリポジトリのみの設定（グローバル設定には影響しません）
echo "⚙️ このリポジトリ専用の設定を適用中..."

# .gitがない場合は初期化
if [ ! -d ".git" ]; then
    git init
fi

# このリポジトリだけの設定
git config --local user.name "$personal_name"
git config --local user.email "$personal_email"

echo "✅ 設定完了！"
echo ""
echo "現在の設定:"
echo "  名前: $(git config --local user.name)"
echo "  メール: $(git config --local user.email)"
echo ""
echo "📌 次のステップ:"
echo "1. GitHubで'windcrew-design'という名前のリポジトリを作成"
echo "2. 以下のコマンドを実行:"
echo ""
echo "   git remote add origin https://github.com/YOUR_PERSONAL_USERNAME/windcrew-design.git"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. その後、GitHub Pagesにデプロイ:"
echo "   npm run deploy"