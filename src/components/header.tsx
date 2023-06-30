// ReactとLinkコンポーネントをインポート
import React from 'react'
import Link from 'next/link'

// Headerコンポーネントの定義
const Header: React.FC = () => {
    return (
        // ヘッダーの要素を返す
        <header className="mb-4 mt-10">
            {/* コンテンツを中央に配置するための要素 */}
            <div className="flex flex-col items-center gap-1">
                {/* ヘッダータイトル */}
                <h1 className="text-2xl font-semibold sm:text-4xl md:text-5xl">Sample Page For Firebase</h1>
                {/* パワードバイのテキスト */}
                <p className="">
                    powered by {/* 外部リンクへのリンク */}
                    <Link href="https://nextjs.org/" className="hover:underline" target="_blank">
                        Next.js
                    </Link>
                </p>
            </div>
        </header>
    )
}

// Headerコンポーネントをエクスポート
export default Header
