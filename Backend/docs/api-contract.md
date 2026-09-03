# API Endpoints

## Authentication

| Method | Endpoint                           | Description                               | Role                   | Auth |
| ------ | ---------------------------------- | ----------------------------------------- | ---------------------- | ---- |
| POST   | `/api/v1/register`                 | Register a new user                       | Public                 | No   |
| POST   | `/api/v1/login`                    | Authenticate user and return access token | Public                 | No   |
| POST   | `/api/v1/logout`                   | Logout current user                       | Any Authenticated User | Yes  |
| GET    | `/api/v1/profile`                  | Retrieve authenticated user's profile     | Any Authenticated User | Yes  |
| PUT    | `/api/v1/change-password`          | Change authenticated user's password      | Any Authenticated User | Yes  |
| POST   | `/api/v1/forgot-password`          | Request password reset link               | Public                 | No   |
| POST   | `/api/v1/reset-password`           | Reset password using token                | Public                 | No   |
| GET    | `/api/v1/email/verify/{id}/{hash}` | Verify user's email address               | Public                 | No   |
| POST   | `/api/v1/email/resend`             | Resend verification email                 | Any Authenticated User | Yes  |
| GET    | `/api/v1/health`                   | Health check                              | Public                 | No   |

### Registration Rules

The registration request includes:

- `name` — required
- `email` — required and unique
- `username` — required and unique
- `phone` — required and unique
- `password` — required
- `password_confirmation` — required

---

## Restaurants

| Method | Endpoint                                   | Description                                               | Role               | Auth |
| ------ | ------------------------------------------ | --------------------------------------------------------- | ------------------ | ---- |
| GET    | `/api/v1/restaurants`                      | Retrieve all approved restaurants                         | Public             | No   |
| GET    | `/api/v1/restaurants/{id}`                 | Retrieve restaurant details                               | Public             | No   |
| GET    | `/api/v1/restaurants/{id}/menu-items`      | Retrieve restaurant menu                                  | Public             | No   |
| GET    | `/api/v1/restaurants/my`                   | Retrieve restaurants managed by the authenticated manager | Restaurant Manager | Yes  |
| POST   | `/api/v1/restaurants`                      | Create a restaurant                                       | Restaurant Manager | Yes  |
| PUT    | `/api/v1/restaurants/{id}`                 | Update restaurant information                             | Restaurant Manager | Yes  |
| PUT    | `/api/v1/restaurants/{id}/approval-status` | Approve or reject a restaurant                            | Admin              | Yes  |
| DELETE | `/api/v1/restaurants/{id}`                 | Delete a restaurant                                       | Admin              | Yes  |

### Restaurant Ownership Rule

- Each restaurant belongs to one restaurant manager, and each restaurant manager can manage multiple restaurants.
- The API must verify that the authenticated manager owns/manages the restaurant before allowing manager-level operations on it.
- Only authenticated customers can submit a restaurant application.
- Newly created restaurants must have `approval_status = pending`.
- Only administrators can approve or reject restaurant applications.
- Rejected restaurants are not visible to the public.

---

## Categories

| Method | Endpoint                             | Description                     | Role   | Auth |
| ------ | ------------------------------------ | ------------------------------- | ------ | ---- |
| GET    | `/api/v1/categories`                 | Retrieve all categories         | Public | No   |
| GET    | `/api/v1/categories/{id}`            | Retrieve category details       | Public | No   |
| GET    | `/api/v1/categories/{id}/menu-items` | Retrieve menu items by category | Public | No   |
| POST   | `/api/v1/categories`                 | Create category                 | Admin  | Yes  |
| PUT    | `/api/v1/categories/{id}`            | Update category                 | Admin  | Yes  |
| DELETE | `/api/v1/categories/{id}`            | Delete category                 | Admin  | Yes  |

---

## Menu Items

| Method | Endpoint                                      | Description                       | Role               | Auth |
| ------ | --------------------------------------------- | --------------------------------- | ------------------ | ---- |
| GET    | `/api/v1/menu-items`                          | Retrieve all menu items           | Public             | No   |
| GET    | `/api/v1/menu-items/{id}`                     | Retrieve menu item details        | Public             | No   |
| POST   | `/api/v1/restaurants/{restaurant}/menu-items` | Create menu item for a restaurant | Restaurant Manager | Yes  |
| PUT    | `/api/v1/menu-items/{id}`                     | Update menu item                  | Restaurant Manager | Yes  |
| DELETE | `/api/v1/menu-items/{id}`                     | Delete menu item                  | Restaurant Manager | Yes  |

### Menu Item Rule

The backend must verify that the authenticated restaurant manager manages the restaurant associated with the menu item.

---

## Cart

| Method | Endpoint            | Description                            | Role     | Auth |
| ------ | ------------------- | -------------------------------------- | -------- | ---- |
| GET    | `/api/v1/cart`      | Retrieve authenticated customer's cart | Customer | Yes  |
| POST   | `/api/v1/cart`      | Add item to cart                       | Customer | Yes  |
| PUT    | `/api/v1/cart/{id}` | Update cart item quantity              | Customer | Yes  |
| DELETE | `/api/v1/cart/{id}` | Remove item from cart                  | Customer | Yes  |
| DELETE | `/api/v1/cart`      | Clear entire cart                      | Customer | Yes  |

---

## Orders

| Method | Endpoint                            | Description                                          | Role                                        | Auth |
| ------ | ----------------------------------- | ---------------------------------------------------- | ------------------------------------------- | ---- |
| GET    | `/api/v1/orders`                    | Retrieve orders accessible to the authenticated user | Customer, Restaurant Manager, Driver, Admin | Yes  |
| GET    | `/api/v1/orders/{id}`               | Retrieve order details                               | Customer, Restaurant Manager, Driver, Admin | Yes  |
| POST   | `/api/v1/orders`                    | Create an order from the customer's cart             | Customer                                    | Yes  |
| PUT    | `/api/v1/orders/{id}/status`        | Update order status                                  | Restaurant Manager, Driver, Admin           | Yes  |
| PUT    | `/api/v1/orders/{id}/assign-driver` | Assign a driver to an order                          | Admin                                       | Yes  |

### Order Rule

The API must enforce authorization so users can only access orders relevant to their role and relationship with the order.

---

## Payments

The platform uses digital payment processing. The customer does not pay cash directly to the driver.

| Method | Endpoint                       | Description                          | Role            | Auth |
| ------ | ------------------------------ | ------------------------------------ | --------------- | ---- |
| POST   | `/api/v1/orders/{id}/payment`  | Initiate payment for an order        | Customer        | Yes  |
| GET    | `/api/v1/orders/{id}/payment`  | Retrieve payment status for an order | Customer, Admin | Yes  |
| POST   | `/api/v1/payments/{id}/verify` | Verify/update payment result         | Admin/System    | Yes  |

### Payment Rules

- A payment belongs to one order.
- An order can have at most one payment record.
- Payment status must be tracked.
- Supported payment methods are `telebirr` and `card`.
- The system must not treat an unpaid order as successfully paid.
- The driver does not collect cash from the customer.

---

## Driver Profiles

| Method | Endpoint                               | Description                             | Role   | Auth |
| ------ | -------------------------------------- | --------------------------------------- | ------ | ---- |
| GET    | `/api/v1/driver-profile`               | Retrieve authenticated driver's profile | Driver | Yes  |
| POST   | `/api/v1/driver-profile`               | Create driver profile                   | Driver | Yes  |
| PUT    | `/api/v1/driver-profile`               | Update driver profile                   | Driver | Yes  |
| PUT    | `/api/v1/driver-profile/online-status` | Update driver's online status           | Driver | Yes  |

- A driver has one driver profile.

---

## Driver Tracking

The system stores the driver's current location so customers can track an active delivery.

| Method | Endpoint                       | Description                                    | Role                    | Auth |
| ------ | ------------------------------ | ---------------------------------------------- | ----------------------- | ---- |
| PUT    | `/api/v1/driver/location`      | Update authenticated driver's current location | Driver                  | Yes  |
| GET    | `/api/v1/orders/{id}/tracking` | Retrieve current driver location for an order  | Customer, Driver, Admin | Yes  |

### Tracking Rules

- Only an authenticated driver can update their own location.
- The location belongs to the driver.
- Tracking is available for orders assigned to that driver.
- The customer can view the driver's current location for an active delivery.
- The system does not require a location-history API unless future requirements need route/history playback.

---

## Ratings

| Method | Endpoint                          | Description                               | Role     | Auth |
| ------ | --------------------------------- | ----------------------------------------- | -------- | ---- |
| GET    | `/api/v1/menu-items/{id}/ratings` | Retrieve ratings for a menu item          | Public   | No   |
| POST   | `/api/v1/menu-items/{id}/ratings` | Submit a rating for a purchased menu item | Customer | Yes  |
| PUT    | `/api/v1/ratings/{id}`            | Update own rating                         | Customer | Yes  |
| DELETE | `/api/v1/ratings/{id}`            | Delete own rating                         | Customer | Yes  |

### Rating Rules

- Only authenticated customers can submit ratings.
- A customer must have purchased the menu item.
- A customer can submit at most one rating for each purchased order item.
- Ratings can only be submitted after the related order has been delivered.
- Rating values must be between 1 and 5.
- Comments are optional.
- The system can calculate the menu item's average rating from its ratings.

---

# API Response Format

All API responses follow a consistent JSON structure.

## Success

```json
{
    "success": true,
    "message": "Success",
    "data": {}
}
```

## Error

```json
{
    "success": false,
    "message": "Error message",
    "errors": {}
}
```

# Authentication

Protected endpoints use Laravel Sanctum Bearer token authentication.

```text
Authorization: Bearer {token}
```

# API Versioning

All application endpoints use the `/api/v1` prefix.

# Content Type

Requests and responses use JSON unless an endpoint explicitly requires another content type.

```text
Content-Type: application/json
Accept: application/json
```
