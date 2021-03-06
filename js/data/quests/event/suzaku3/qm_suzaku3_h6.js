{
   id: "suzaku3_h6",
   name: "共闘級 信じあう絆のもとに",
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
               name: "浮遊機雷 ライカ",
               hp: 70000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1000, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 2,
                  wait: 1
               }
            },
            {
               name: "インターセプター サンダーバグ",
               hp: 50000,
               imageno: 8216,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_as_sealed(5, 4),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー スパークラー",
               hp: 50000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true)
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
               name: "チャンスメドレー スパークラー",
               hp: 100000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attack_ratio(0.8, 5, true))
                  ],
                  on_move: [
                     s_enemy_attack(250, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 70000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attrguard_all([1,0,0,0,0], 0.5, 6)/* Warning: 属性要確認： 火属性防御50%（5T） */)
                  ],
                  on_move: [
                     s_enemy_attack(250, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "自動迎撃式機雷 イナズマ",
               hp: 80000,
               imageno: 8211,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     s_enemy_force_reservoir()
                  ],
                  on_move: [
                     s_enemy_attack(1875, 1, 1, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_force_reservoir()/* Info: 先制行動を再使用します */
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
               name: "自動迎撃式機雷 イナズマ",
               hp: 100000,
               imageno: 8211,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     s_enemy_chain_break()
                  ],
                  on_move: [
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_attack(250, 3, 3, true),
                     s_enemy_chain_break()/* Info: 先制行動を再使用します */
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "浮遊機雷 ライカ",
               hp: 80000,
               imageno: 8210,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(180, 5, 5, true),
                     s_enemy_attack(180, 5, 5, true),
                     s_enemy_attack(180, 5, 5, true),
                     s_enemy_attack(180, 5, 5, true),
                     s_enemy_attack(180, 5, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "インターセプター サンダーバグ",
               hp: 100000,
               imageno: 8216,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attr_weaken([0,0,1,0,0], 1.5, 5, 4)/* Warning: 属性要確認： 雷属性弱体化50%（3T） */,
                     s_enemy_attack(366.6666666666667, 3, 3, true),
                     s_enemy_attack(366.6666666666667, 3, 3, true),
                     s_enemy_attack(366.6666666666667, 3, 3, true),
                     s_enemy_attack(366.6666666666667, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 2,
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
               name: "チャンスメドレー スパークラー",
               hp: 80000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attack_ratio(0.7, 5, true))
                  ],
                  on_move: [
                     s_enemy_attack(400, 3, 3, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "想いの怪物 キワム・コピー",
               hp: 750000,
               imageno: 8205,
               attr: 2,
               spec: 8,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_attack, "5体に10連撃", 100, false, 600, 5, 10, true)),
                     damage_switch(s_enemy_when_after_turn(3), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_poison(1000, 5, 1),
                     s_enemy_attack_ratio(0.5, 5, true)
                  ],
                  on_move_angry: [
                     s_enemy_attack_ratio(0.5, 5, true),
                     s_enemy_poison(2000, 5, 5),
                     s_enemy_attack_ratio(0.5, 5, true),
                     s_enemy_poison(2000, 5, 5),
                     s_enemy_attack_ratio(0.5, 5, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "チャンスメドレー スパークラー",
               hp: 80000,
               imageno: 8217,
               attr: 2,
               spec: 6,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(s_enemy_attrguard_all([1,0,0,0,0], 0.75, 6)/* Warning: 属性要確認： 火属性防御75%（5T） */)
                  ],
                  on_move: [
                     s_enemy_attack(400, 3, 3, true)
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