{
   id: "suzaku3_h2",
   name: "調査級 カリュプスの成長",
   category: "suzaku3",
   category_jp: "スザクⅢ",
   desc: "",
   overlap: false,
   aprnum: 4,
   data: [
      {
         appearance: [
            1
         ],
         enemy: [
            {
               name: "浮遊機雷 ゴウカ",
               hp: 35000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1000, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "自動迎撃式機雷 カゲロウ",
               hp: 25000,
               imageno: 8207,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1250, 1, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター ファイアアント",
               hp: 35000,
               imageno: 8212,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1000, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            }
         ]
      },
      {
         appearance: [
            2
         ],
         enemy: [
            {
               name: "チャンスメドレー フラムボヤント",
               hp: 50000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー フラムボヤント",
               hp: 45000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_chain_break(),
                     s_enemy_attack(300, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ゴウカ",
               hp: 70000,
               imageno: 8206,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(damage_block_own(25000, 3))
                  ],
                  on_move: [
                     s_enemy_attack(1000, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            }
         ]
      },
      {
         appearance: [
            3
         ],
         enemy: [
            {
               name: "自動迎撃式機雷 カゲロウ",
               hp: 60000,
               imageno: 8207,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_attr_weaken/* Warning: 属性要確認： 火属性弱体化100%（3T） */, "火属性弱体化100%（3T）", 100, false, [1,0,0,0,0], 2, 5, 4))
                  ],
                  on_move: [
                     s_enemy_attack(300, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター サンダーバグ",
               hp: 35000,
               imageno: 8216,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_panicshout(0, 5, 2))
                  ],
                  on_move: [
                     s_enemy_attack_attrsp(500, 250, [0,1,0,0,0], 5, 1, false)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー フラムボヤント",
               hp: 60000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     m_enemy_once(s_enemy_as_sealed(5, 3)),
                     s_enemy_attack(300, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            }
         ]
      },
      {
         appearance: [
            4
         ],
         enemy: [
            {
               name: "浮遊機雷 ヒョウカ",
               hp: 80000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(attack_counter(500, 100)),
                     damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(200, 3, 3, true)
                  ],
                  on_angry: [
                     attack_counter_dual(2000, 100)
                  ],
                  on_move_angry: [
                     s_enemy_attack(200, 3, 3, true),
                     s_enemy_attack(200, 3, 3, true),
                     s_enemy_attack(200, 3, 3, true),
                     s_enemy_attack(200, 3, 3, true),
                     s_enemy_attack(200, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "外敵殲滅戦術統御機 ケントゥリオ",
               hp: 300000,
               imageno: 8187,
               attr: 0,
               spec: 6,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_attack, "通常攻撃 （700ダメージ、単体）", 100, false, 700, 1, 1, true)),
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(350, 5, 4, true),
                     s_enemy_attack(350, 5, 4, true)
                  ],
                  on_angry: [
                     s_enemy_panicshout(0, 5, 4)
                  ],
                  on_move_angry: [
                     s_enemy_attack(350, 5, 4, true),
                     s_enemy_attack(350, 5, 4, true),
                     s_enemy_attack(350, 5, 4, true),
                     s_enemy_attack(350, 5, 4, true),
                     s_enemy_attack(350, 5, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー フラムボヤント",
               hp: 150000,
               imageno: 8213,
               attr: 0,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_panicshout, "混乱（ターゲット対象敵のみ） 5体×5T", 100, false, 0, 5, 6))
                  ],
                  on_move: [
                     s_enemy_attack(583.3333333333334, 3, 3, true),
                     s_enemy_attack(583.3333333333334, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            }
         ]
      }
   ]
}