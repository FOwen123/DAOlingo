/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/daolingo.json`.
 */
export type Daolingo = {
  "address": "3sxbp3FudD9sjCtDvUgmpf9P3ENJd3LdsWLo196XW8CL",
  "metadata": {
    "name": "daolingo",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "castVote",
      "discriminator": [
        20,
        212,
        15,
        189,
        69,
        180,
        69,
        151
      ],
      "accounts": [
        {
          "name": "proposal",
          "writable": true
        },
        {
          "name": "voterInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  111,
                  116,
                  101,
                  114,
                  95,
                  105,
                  110,
                  102,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "proposal"
              },
              {
                "kind": "account",
                "path": "voter"
              }
            ]
          }
        },
        {
          "name": "voter",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "voteFor",
          "type": "bool"
        }
      ]
    },
    {
      "name": "createProposal",
      "discriminator": [
        132,
        116,
        68,
        174,
        216,
        160,
        198,
        22
      ],
      "accounts": [
        {
          "name": "dao",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  97,
                  111
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "proposal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  112,
                  111,
                  115,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "expiration",
          "type": "i64"
        },
        {
          "name": "proposalNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "results",
      "discriminator": [
        233,
        85,
        252,
        112,
        117,
        191,
        143,
        53
      ],
      "accounts": [
        {
          "name": "proposal"
        }
      ],
      "args": []
    },
    {
      "name": "status",
      "discriminator": [
        218,
        160,
        35,
        24,
        130,
        107,
        205,
        125
      ],
      "accounts": [
        {
          "name": "proposal"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dao",
      "discriminator": [
        163,
        9,
        47,
        31,
        52,
        85,
        197,
        49
      ]
    },
    {
      "name": "proposal",
      "discriminator": [
        26,
        94,
        189,
        187,
        116,
        136,
        53,
        33
      ]
    },
    {
      "name": "voterInfo",
      "discriminator": [
        95,
        188,
        134,
        116,
        132,
        212,
        148,
        94
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "descriptionTooLong",
      "msg": "Description too long"
    },
    {
      "code": 6001,
      "name": "proposalExpired",
      "msg": "The proposal has already expired."
    },
    {
      "code": 6002,
      "name": "alreadyVoted",
      "msg": "The voter has already cast a vote."
    },
    {
      "code": 6003,
      "name": "invalidProposalNumber",
      "msg": "Invalid proposal number."
    }
  ],
  "types": [
    {
      "name": "dao",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalProposals",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "proposal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "voteNumber",
            "type": "u64"
          },
          {
            "name": "expiration",
            "type": "i64"
          },
          {
            "name": "votedFor",
            "type": "u64"
          },
          {
            "name": "votedAgainst",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voterInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voted",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
