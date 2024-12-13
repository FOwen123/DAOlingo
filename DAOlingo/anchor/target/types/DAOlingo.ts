/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/daolingo.json`.
 */
export type Daolingo = {
  "address": "HYaDDppTNC8jJkgzPunXmvnWUBFn2cSVeQam3WMShhEe",
  "metadata": {
    "name": "daolingo",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "approveCertification",
      "discriminator": [
        212,
        208,
        101,
        97,
        229,
        54,
        70,
        101
      ],
      "accounts": [
        {
          "name": "certification",
          "writable": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "approver"
        }
      ],
      "args": []
    },
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
      "name": "completeModule",
      "discriminator": [
        55,
        250,
        112,
        48,
        220,
        136,
        158,
        105
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "module",
          "writable": true
        },
        {
          "name": "progress",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  103,
                  114,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "apprenticeTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "modulePubkey",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createModule",
      "discriminator": [
        74,
        150,
        3,
        191,
        94,
        127,
        118,
        158
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "module",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  111,
                  100,
                  117,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "mentorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "videoUrl",
          "type": "string"
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
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
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
    },
    {
      "name": "submitCertification",
      "discriminator": [
        15,
        233,
        175,
        70,
        117,
        114,
        224,
        163
      ],
      "accounts": [
        {
          "name": "certification",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  101,
                  114,
                  116,
                  105,
                  102,
                  105,
                  99,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "payer",
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
          "name": "certificationIds",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "voteModule",
      "discriminator": [
        31,
        9,
        157,
        128,
        173,
        185,
        67,
        76
      ],
      "accounts": [
        {
          "name": "module",
          "writable": true
        },
        {
          "name": "mvoterInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
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
                "path": "module"
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
    }
  ],
  "accounts": [
    {
      "name": "certification",
      "discriminator": [
        141,
        130,
        166,
        168,
        167,
        23,
        163,
        147
      ]
    },
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
      "name": "mVoterInfo",
      "discriminator": [
        197,
        162,
        184,
        203,
        45,
        222,
        197,
        253
      ]
    },
    {
      "name": "module",
      "discriminator": [
        234,
        149,
        112,
        29,
        65,
        203,
        69,
        160
      ]
    },
    {
      "name": "progress",
      "discriminator": [
        125,
        4,
        195,
        102,
        134,
        179,
        253,
        6
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
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
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
    },
    {
      "code": 6004,
      "name": "unauthorizedRole",
      "msg": "Unauthorized: Only mentors can perform this action."
    },
    {
      "code": 6005,
      "name": "unauthorizedRoleApprentice",
      "msg": "Unauthorized: Only apprentices can submit certifications."
    },
    {
      "code": 6006,
      "name": "unauthorizedApproval",
      "msg": "Unauthorized: Only mentors can approve certifications."
    },
    {
      "code": 6007,
      "name": "certificationAlreadyApproved",
      "msg": "Certification is already approved."
    }
  ],
  "types": [
    {
      "name": "certification",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "apprentice",
            "type": "pubkey"
          },
          {
            "name": "certifications",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "approved",
            "type": "bool"
          }
        ]
      }
    },
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
      "name": "mVoterInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "module",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
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
            "name": "videoUrl",
            "type": "string"
          },
          {
            "name": "upvotes",
            "type": "u64"
          },
          {
            "name": "downvotes",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "progress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "completedModules",
            "type": "u64"
          },
          {
            "name": "lastCompleted",
            "type": "pubkey"
          },
          {
            "name": "totalIncentives",
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
      "name": "role",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "mentor"
          },
          {
            "name": "apprentice"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "pubkey"
          },
          {
            "name": "role",
            "type": {
              "defined": {
                "name": "role"
              }
            }
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
