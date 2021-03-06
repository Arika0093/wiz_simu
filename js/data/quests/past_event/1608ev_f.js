{
   id: "1608ev_f",
   name: "(2016/08)イベントトーナメント 封魔級",
   desc: "",
   overlap: false,
   aprnum: 5,
   data: [
      {
         appearance: [
            1
         ],
         enemy: [
            {
               name: "絶対に譲らない神",
               hp: 25000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(700, 1, 1, true)/*nogambits*/
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 25000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(500, 5, 1, true),
                     s_enemy_chain_sealed(3)
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
               name: "怒りに震える神",
               hp: 20000,
               imageno: 8851,
               attr: 2,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(250, 5, 1, true),
                     s_enemy_chain_sealed(4)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 30000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(700, 1, 1, true)/*nogambits*/
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 30000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(700, 1, 1, true)/*nogambits*/
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
               name: "絶対に譲らない神",
               hp: 25000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(700, 1, 1, true)/*nogambits*/
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 25000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(500, 5, 1, true),
                     s_enemy_chain_sealed(3)
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
               name: "絶対に譲らない神",
               hp: 30000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(damage_block_own(20000, 3))
                  ],
                  on_move: [
                     s_enemy_attack(750, 5, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "あらゆる敵を排除する神",
               hp: 22500,
               imageno: 8852,
               attr: 2,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(750, 1, 1, true)
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 2
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 40000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(750, 1, 1, true),
                     s_enemy_heal_all(0.3)
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
            5
         ],
         enemy: [
            {
               name: "絶対に譲らない神",
               hp: 75000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_move: [
                     s_enemy_attack(1500, 1, 1, true),
                     s_enemy_chain_break()
                  ],
                  atrandom: false,
                  turn: 2,
                  wait: 1
               }
            },
            {
               name: "引き際を知らぬ神 リッキー・リック",
               hp: 200000,
               imageno: 8833,
               attr: 1,
               spec: 1,
               isStrong: true,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_cursed, "-", 100, false, 1000, 5, 3)),
                     damage_switch(s_enemy_when_dead_l(), m_enemy_angry(), true)
                  ],
                  on_move: [
                     s_enemy_attack(750, 5, 1, true)
                  ],
                  on_angry: [
                     s_enemy_chain_sealed(6)
                  ],
                  on_move_angry: [
                     s_enemy_attack(750, 5, 1, true),
                  ],
                  atrandom: false,
                  turn: 1,
                  wait: 1
               }
            },
            {
               name: "絶対に譲らない神",
               hp: 85000,
               imageno: 8850,
               attr: 1,
               spec: 1,
               isStrong: false,
               move: {
                  on_popup: [
                     m_enemy_once(skill_counter_func(s_enemy_poison, "-", 100, false, 1500, 5, 3))
                  ],
                  on_move: [
                     s_enemy_attack(1000, 1, 1, true)
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