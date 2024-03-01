# Random Ideas

- [x] Idea modal
- [ ] User modal

## Moogoose

- [ ] use controllers for CRUD operations
- [ ] use mongoose for validation
- [ ] FE - login user after signed up
- [ ] forget / reset password
- [ ] users list, modify, delete, update api

## Data Modeling

1. types of relations between data
  1.1 one-to-one
  1.2 one-to-many
  1.3 many-to-many
2. referencing vs embedding
3. when to embed vs reference
  3.1 relationship type
    - [embedding] 1:FEW; 1:MANY;
    - [referencing] 1:MANY; 1:TON; MANY:MANY;
  3.2 data access patterns
    - [embedding] High read/write ratio
    - [referencing] Low read/write ratio
  3.3 data closeness
    - [referencing] really belong together
    - [embedding] frequently queried