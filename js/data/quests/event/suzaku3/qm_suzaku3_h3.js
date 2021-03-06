{
   id: "suzaku3_h3",
   name: "予兆級 謎めいた不安",
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
               name: "自動迎撃式機雷 ミズノツキ",
               hp: 40000,
               imageno: 8209,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(287.5, 3, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター スノークラブ",
               hp: 80000,
               imageno: 8214,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(2500, 1, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "自動迎撃式機雷 ミズノツキ",
               hp: 40000,
               imageno: 8209,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(287.5, 3, 4, true)
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
            2
         ],
         enemy: [
            {
               name: "自動迎撃式機雷 ミズノツキ",
               hp: 60000,
               imageno: 8209,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_chain_break())
                  ],
                  on_move: [
                     s_enemy_attack(750, 5, 1, true)/* Warning: SPの解釈に失敗したため通常攻撃を挿入します */
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ヒョウカ",
               hp: 60000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 80000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_as_sealed, "5体のアンサースキルを封印する（5T）", 100, false, 5, 6)/* Warning: 仮実装のため、十分に内容を精査してください */)
                  ],
                  on_move: [
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
            3
         ],
         enemy: [
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 60000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1875, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "浮遊機雷 ヒョウカ",
               hp: 100000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(312.5, 3, 4, true)
                  ],
                  on_popup: [
                     damage_switch(s_enemy_when_dead_s(), m_enemy_angry(), true)
                  ],
                  on_angry: [
                     s_enemy_discharge(5, 3)
                  ],
                  on_move_angry: [
                     s_enemy_attack(312.5, 4, 4, true),
                     s_enemy_attack(312.5, 4, 4, true),
                     s_enemy_attack(312.5, 4, 4, true),
                     s_enemy_attack(312.5, 4, 4, true),
                     s_enemy_attack(312.5, 4, 4, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ヒョウカ",
               hp: 80000,
               imageno: 8208,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1875, 5, 1, true)
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
            4
         ],
         enemy: [
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 150000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(300, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "復讐の収穫者 トキモリ＆ネヴィアム",
               hp: 400000,
               imageno: 8191,
               attr: 1,
               spec: 2,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter(9999, 100)),
                     damage_switch(s_enemy_when_hpdown(0.5), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(350, 3, 5, true)
                  ],
                  on_angry: [
                     s_enemy_attack_ratio(0.5, 5, true)
                  ],
                  on_move_angry: [
                     s_enemy_attack(350, 3, 5, true),
                     s_enemy_attack(350, 3, 5, true),
                     s_enemy_attack(350, 3, 5, true),
                     s_enemy_attack(350, 3, 5, true),
                     s_enemy_attack(350, 3, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー アヴァランチ",
               hp: 100000,
               imageno: 8215,
               attr: 1,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_heal_all(0.5),
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true),
                     s_enemy_attack(400, 3, 4, true)
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