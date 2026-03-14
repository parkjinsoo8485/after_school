# Firestore Schema

## users/{uid}
- displayName: string
- email: string
- role: string (`user` | `admin`)
- createdAt: timestamp
- updatedAt: timestamp

## items/{itemId}
- title: string
- description: string
- status: string (`active` | `archived`)
- createdBy: string (uid)
- createdAt: timestamp
- updatedAt: timestamp

## auditLogs/{logId} (optional »Æ¿Â)
- actorUid: string
- action: string
- entityType: string
- entityId: string
- branch: string
- severity: string
- createdAt: timestamp