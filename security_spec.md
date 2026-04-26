# Security Specification for Tahmid TechOps

## Data Invariants
1. A contact message must have a valid email and non-empty name/message.
2. Projects, skills, and services are public content and should be read-only for general users.
3. Only the site owner (Tahmid) can modify site content (projects, skills, services).

## The "Dirty Dozen" Payloads

1. **Identity Spoofing**: Attempt to create a project as an unauthenticated user.
2. **Resource Poisoning**: Attempt to create a project with a 2MB description string.
3. **Identity Poisoning**: Attempt to read the `contacts` collection as a random user.
4. **State Shortcutting**: Attempt to update a contact's `createdAt` timestamp to a future date.
5. **PII Leak**: Attempt to list all `contacts` as an unauthenticated user.
6. **Shadow Update**: Attempt to add an `isAdmin: true` field to a user profile (if one existed).
7. **Cross-User Write**: Attempt to delete a project.
8. **Invalid Type**: Attempt to set skill `percentage` as a string.
9. **Missing Required Field**: Attempt to create a projects without an `imageUrl`.
10. **ID Injection**: Attempt to use a very long malicious string as a document ID.
11. **Massive Array**: Attempt to add 10,000 features to a service.
12. **Tampering**: Attempt to update an existing contact message.

## The Test Runner (Conceptual)
All write operations to `projects`, `skills`, and `services` must be denied unless `request.auth.token.email == 'tahmidtoky402@gmail.com'`.
All `contacts` messages are write-only for public (create only) and read-only for Admin.
