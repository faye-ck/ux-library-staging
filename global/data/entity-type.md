# Entity Type

> Shared entity type definitions used across all Colorkrew products. Defines what each entity is and how permission precedence works.

---

## Entity Types

### User
An individual person with a Colorkrew account.
- Belongs to exactly **one Department**.
- Can belong to **multiple User Groups**.

### Group
An abstract category with two concrete types:

| Type | Description | Membership |
|------|-------------|------------|
| **Department** | Organizational unit (e.g., Engineering, HR) | One per user — exclusive |
| **User Group** | Flexible grouping for access or workflows | Multiple per user — inclusive |

### Everyone
Company-wide scope — applies to all users regardless of department or group membership.

---

## Permission Precedence

When permissions conflict, the **most specific (smallest) scope wins**.

Precedence order (lowest → highest):

```
Everyone < Group (Department / User Group) < Individual User
```

**Example:** If Everyone has read-only access, a User Group has edit access, and a specific user has no access — that user's individual setting takes precedence and they cannot access the resource.

---

## Rules
- A user can only be in one Department at a time.
- A user can be in zero or more User Groups.
- Individual User permissions always override Group permissions.
- Group permissions always override Everyone permissions.
- When multiple Group-level permissions apply (e.g., user is in two User Groups with different access), the most restrictive applies unless product-specific rules state otherwise.
