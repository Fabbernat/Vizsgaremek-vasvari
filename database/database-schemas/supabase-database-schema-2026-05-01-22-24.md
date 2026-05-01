## Table `meals`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `name` | `varchar` |  |
| `description` | `varchar` |  |
| `price` | `int4` |  |
| `restaurant_id` | `int4` |  |
| `image_url` | `text` |  Nullable |

## Table `order_items`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `order_id` | `int4` |  |
| `meal_id` | `int4` |  |
| `restaurant_id` | `int4` |  |
| `quantity` | `int4` |  |
| `unit_price` | `int4` |  |

## Table `orders`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `restaurant_id` | `int4` |  |
| `user_id` | `int4` |  |
| `ordered_at` | `timestamptz` |  |
| `delivered` | `bool` |  |
| `status` | `varchar` |  |

## Table `restaurants`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `name` | `varchar` |  |
| `owner_id` | `int4` |  |

## Table `shops`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `name` | `varchar` |  |
| `owner_id` | `int4` |  |

## Table `users`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `username` | `varchar` |  Unique |
| `first_name` | `varchar` |  |
| `last_name` | `varchar` |  |
| `email` | `varchar` |  Unique |
| `password_hash` | `text` |  |
| `address` | `varchar` |  |
| `role` | `varchar` |  |

