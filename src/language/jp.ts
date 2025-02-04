export default {
  topBar: {
    search: {
      title: '検索'
    },
    user: ['マイページ', 'ドキュメント', 'Github', 'ログアウト']
  },
  common: {
    tips: 'ヒント',
    cancel: 'キャンセル',
    confirm: '確認',
    logOutTips: 'ログアウトしますか？'
  },
  search: {
    placeholder: 'ページを検索',
    historyTitle: '検索履歴',
    switchKeydown: '切り替え',
    selectKeydown: '選択'
  },
  setting: {
    menuType: {
      title: 'メニューレイアウト',
      list: ['垂直', '水平', 'ミックス', '2列']
    },
    theme: {
      title: 'テーマスタイル',
      list: ['ライト', 'ダーク', 'システム']
    },
    menu: {
      title: 'メニュースタイル'
    },
    color: {
      title: 'システムテーマカラー'
    },
    box: {
      title: 'ボックススタイル',
      list: ['ボーダー', 'シャドウ']
    },
    basics: {
      title: '基本設定',
      list: [
        'サイドバーアコーディオンモード',
        'サイドバー折りたたみボタンを表示',
        'ページ再読み込みボタンを表示',
        'パンくずリストを表示',
        'マルチタブを有効化',
        '多言語選択を表示',
        'トップ進捗バーを表示',
        'カラーユニバーサルデザイン',
        '設定センターを自動で閉じる',
        'ウォーターマーク',
        'メニュー幅',
        'ページ遷移アニメーション',
        'カスタム角丸'
      ]
    }
  },
  notice: {
    title: '通知',
    btnRead: '既読にする',
    bar: ['通知', 'メッセージ', 'タスク'],
    text: ['データなし']
  },
  worktab: {
    btn: ['左のタブを閉じる', '右のタブを閉じる', '他のタブを閉じる', 'すべてのタブを閉じる']
  },
  console: {
    card: [
      '総アクセス数',
      'オンラインユーザー数',
      'クリック数',
      '記事数',
      'コメント数',
      '保留中のタスク'
    ],
    dashboard: {
      total: '合計',
      unredeemed: '未使用',
      inUse: '使用中',
      expired: '期限切れ'
    },
    histogram: {
      title: 'アクセス数'
    },
    dynamic: {
      member: 'マイユーザー',
      total: '合計',
      user: 'ユーザー',
      progress: '進捗'
    },
    plan: {
      title: '計画'
    },
    lingChart: {
      title: 'トラフィック傾向'
    },
    todo: {
      title: 'タスク'
    },
    pieChart: {
      title: 'カテゴリ統計'
    }
  },
  login: {
    leftView: {
      title: 'ユーザー体験を重視した管理システムテンプレート',
      subTitle: '視覚的に最適化された美しく実用的なインターフェース'
    },
    title: 'おかえりなさい',
    subTitle: 'アカウントとパスワードを入力してログイン',
    placeholder: ['アカウントを入力', 'パスワードを入力', 'スライドして認証を完了'],
    rule: [
      'パスワードを再入力してください',
      'パスワードが一致しません',
      '3〜20文字で入力してください',
      'パスワードは6文字以上必要です',
      'プライバシーポリシーに同意してください'
    ],
    sliderText: 'スライドして認証',
    sliderSuccessText: '認証成功',
    rememberPwd: 'パスワードを記憶',
    forgetPwd: 'パスワードをお忘れの方',
    btnText: 'ログイン',
    noAccount: 'アカウントをお持ちでない方',
    register: '登録'
  },
  forgetPassword: {
    title: 'パスワードをお忘れですか？',
    subTitle: 'メールアドレスを入力してパスワードをリセット',
    placeholder: 'メールアドレスを入力',
    submitBtnText: '送信',
    backBtnText: '戻る'
  },
  register: {
    title: 'アカウント作成',
    subTitle: '以下の情報を入力して登録を完了してください',
    placeholder: ['アカウントを入力', 'パスワードを入力', 'パスワードを再入力'],
    agreeText: '私は',
    privacyPolicy: 'プライバシーポリシー',
    submitBtnText: '登録',
    hasAccount: 'すでにアカウントをお持ちの方',
    toLogin: 'ログインへ'
  },
  lockScreen: {
    pwdError: 'パスワードが間違っています',
    lock: {
      inputPlaceholder: 'ロック画面パスワードを入力',
      btnText: 'ロック'
    },
    unlock: {
      inputPlaceholder: 'ロック解除パスワードを入力',
      btnText: 'ロック解除',
      backBtnText: 'ログインに戻る'
    }
  },
  analysis: {
    todaySales: {
      title: '本日の売上',
      subtitle: '売上サマリー',
      export: 'エクスポート',
      cards: {
        totalSales: {
          label: '総売上',
          change: '+15%'
        },
        totalOrder: {
          label: '総注文数',
          change: '+5%'
        },
        productSold: {
          label: '販売済み商品',
          change: '+2%'
        },
        newCustomers: {
          label: '新規顧客',
          change: '+8%'
        }
      },
      fromYesterday: '前日比'
    },
    visitorInsights: {
      title: '訪問者分析',
      legend: {
        loyalCustomers: 'リピーター',
        newCustomers: '新規顧客',
        uniqueCustomers: 'ユニーク訪問者'
      }
    },
    totalRevenue: {
      title: '総収益',
      legend: {
        onlineSales: 'オンライン売上',
        offlineSales: 'オフライン売上'
      }
    },
    customerSatisfaction: {
      title: '顧客満足度',
      legend: {
        lastMonth: '先月',
        thisMonth: '今月'
      }
    },
    targetVsReality: {
      title: '目標と実績',
      realitySales: {
        label: '実際の売上',
        sublabel: 'グローバル'
      },
      targetSales: {
        label: '目標売上',
        sublabel: 'ビジネス'
      }
    },
    topProducts: {
      title: '人気商品',
      columns: {
        name: '商品名',
        popularity: '人気度',
        sales: '売上'
      },
      products: {
        homeDecor: {
          name: 'ホームデコレーション',
          sales: '10%'
        },
        disneyBag: {
          name: 'ディズニープリンセスピンクバッグ 18"',
          sales: '29%'
        },
        bathroom: {
          name: 'バスルームアイテム',
          sales: '65%'
        },
        smartwatch: {
          name: 'アップルスマートウォッチ',
          sales: '32%'
        },
        fitness: {
          name: 'フィットネストラッカー',
          sales: '78%'
        },
        earbuds: {
          name: 'ワイヤレスイヤホン',
          sales: '41%'
        }
      }
    },
    salesMappingCountry: {
      title: '国別売上分布'
    },
    volumeServiceLevel: {
      title: '取引量とサービスレベル',
      legend: {
        volume: '取引量',
        services: 'サービス'
      }
    },
    notFound: {
      desc: '申し訳ありません。お探しのページは存在しません',
      btn: 'ホームに戻る'
    }
  },
  purchase: {
    purchaseTitle: 'eSIMを購入',
    country: '国/地域',
    selectCountry: '国を選択',
    planType: 'プランタイプ',
    unlimited: '無制限',
    dataLimit: 'データ制限',
    daily: '日次プラン',
    duration: '利用期間',
    selectDuration: '期間を選択',
    days: '日間',
    dataAmount: 'データ容量',
    selectData: 'データ容量を選択',
    quantity: '数量',
    totalPrice: '合計金額',
    purchaseWithBalance: '残高で購入',
    purchaseOnOfficial: '公式サイトで購入',
    scanQRCode: 'QRコードをスキャン',
    required: 'この項目は必須です'
  },
  recharge: {
    title: 'アカウントチャージ',
    balance: '現在の残高',
    history: {
      title: 'チャージ履歴',
      time: 'チャージ時間',
      amount: 'チャージ金額',
      method: '支払方法',
      methods: {
        alipay: 'Alipay',
        wechat: 'WeChat Pay',
        card: '銀行カード'
      }
    },
    consumption: {
      title: '消費履歴',
      time: '消費時間',
      amount: '消費金額',
      type: '消費タイプ',
      description: '説明',
      types: {
        service: 'サービス料金',
        subscription: '定期購読料金',
        other: 'その他の料金'
      }
    }
  }
} 