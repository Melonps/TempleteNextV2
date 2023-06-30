// ReactとLinkコンポーネントをインポート
import React from 'react'
import Link from 'next/link'

// Footerコンポーネントの定義
const Footer: React.FC = () => {
    return (
        // フッター要素を返す
        <footer>
            {/* 中央にコンテンツを配置するための要素 */}
            <div className="my-4 flex flex-col items-center">
                {/* プロジェクト作者の情報 */}
                <p>
                    This project was made by {/* 外部リンクへのリンク */}
                    <Link href="https://github.com/Melonps" className="hover:underline" target="_blank">
                        Kakehi
                    </Link>
                    . {/* ソースコードへのリンク */}
                    <Link href="https://github.com/Melonps/TempleteNextV2" className="hover:underline" target="_blank">
                        Click to see the source code.
                    </Link>
                </p>
                {/* データの保存場所に関する情報 */}
                <p>All data will be saved locally in your browser.</p>
            </div>
        </footer>
    )
}

// Footerコンポーネントをエクスポート
export default Footer
