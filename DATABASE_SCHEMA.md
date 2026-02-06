# Airline Booking System - Database Schema

## Entity Relationship Diagram

```
┌─────────────┐
│   CITIES    │
│─────────────│
│ id (PK)     │
│ name        │
│ country     │
│ timezone    │
│ population  │
│ latitude    │
│ longitude   │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   AIRPORTS      │
│─────────────────│
│ id (PK)         │
│ code (UNIQUE)   │
│ name            │
│ cityId (FK) ────┼──→ cities.id
│ iataCode        │
│ latitude        │
│ longitude       │
│ timezone        │
└────────┬────────┘
         │
         │ 1:N (departure)
         │ 1:N (arrival)
         │
┌────────┴────────────────────────────┐
│          FLIGHTS                    │
│─────────────────────────────────────│
│ id (PK)                             │
│ flightNumber (UNIQUE)               │
│ airlineId (FK) ─────────────────────┼──→ airlines.id
│ airplaneId (FK) ────────────────────┼──→ airplanes.id
│ departureAirportId (FK) ────────────┼──→ airports.id
│ arrivalAirportId (FK) ──────────────┼──→ airports.id
│ departureTime                       │
│ arrivalTime                         │
│ duration                            │
│ status                              │
│ price                               │
│ boardingGate                        │
└─────────────┬───────────────────────┘
              │
              │ 1:N
              │
┌─────────────┴──────────┐
│   FLIGHT_SEATS         │
│────────────────────────│
│ id (PK)                │
│ flightId (FK) ─────────┼──→ flights.id
│ seatId (FK) ───────────┼──→ seats.id
│ isAvailable            │
│ price                  │
└────────────────────────┘


┌─────────────┐
│  AIRLINES   │
│─────────────│
│ id (PK)     │
│ code (UQ)   │
│ name        │
│ country     │
│ logo        │
│ website     │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   AIRPLANES     │
│─────────────────│
│ id (PK)         │
│ airlineId (FK) ─┼──→ airlines.id
│ modelNumber     │
│ capacity        │
│ manufacturer    │
│ yearManufactured│
│ status          │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────┴────────┐
│     SEATS       │
│─────────────────│
│ id (PK)         │
│ airplaneId (FK) ┼──→ airplanes.id
│ seatNumber      │
│ class           │
│ isWindowSeat    │
│ isAisleSeat     │
└─────────────────┘


┌─────────────┐
│    USERS    │
│─────────────│
│ id (PK)     │
│ email (UQ)  │
│ password    │
│ firstName   │
│ lastName    │
│ phoneNumber │
│ role        │
│ dateOfBirth │
│ passportNo  │
│ nationality │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   PASSENGERS    │
│─────────────────│
│ id (PK)         │
│ userId (FK) ────┼──→ users.id
│ firstName       │
│ lastName        │
│ dateOfBirth     │
│ gender          │
│ passportNumber  │
│ nationality     │
│ email           │
│ phoneNumber     │
└─────────────────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   BOOKINGS      │
│─────────────────│
│ id (PK)         │
│ bookingRef (UQ) │
│ userId (FK) ────┼──→ users.id (RESTRICT)
│ flightId (FK) ──┼──→ flights.id (RESTRICT)
│ status          │
│ totalAmount     │
│ bookingDate     │
└────────┬────────┘
         │
         │ 1:N
         ├────────────────────┐
         │                    │
┌────────┴────────┐  ┌────────┴────────┐
│    TICKETS      │  │    PAYMENTS     │
│─────────────────│  │─────────────────│
│ id (PK)         │  │ id (PK)         │
│ bookingId (FK) ─┼→ │ bookingId (FK) ─┼→ bookings.id (CASCADE)
│ flightId (FK) ──┼→ │ amount          │
│ passengerId (FK)│  │ paymentMethod   │
│ seatId (FK) ────┼→ │ paymentStatus   │
│ seatNumber      │  │ transactionId   │
│ class           │  │ paymentDate     │
│ price           │  └─────────────────┘
│ status          │
└─────┬───────────┘
      │
      │ 1:N
      ├───────────────────┬──────────────────┐
      │                   │                  │
┌─────┴──────┐  ┌─────────┴────────┐  ┌─────┴────────────┐
│  BAGGAGE   │  │ BOARDING_PASSES  │  │                  │
│────────────│  │──────────────────│  │                  │
│ id (PK)    │  │ id (PK)          │  │                  │
│ ticketId ──┼→ │ ticketId (FK) ───┼→ │                  │
│ type       │  │ seatNumber       │  │                  │
│ weight     │  │ boardingTime     │  │                  │
│ status     │  │ gate             │  │                  │
│ description│  │ status           │  │                  │
└────────────┘  └──────────────────┘  └──────────────────┘
         │
         │ 1:N
         │
┌────────┴────────┐
│    REVIEWS      │
│─────────────────│
│ id (PK)         │
│ userId (FK) ────┼──→ users.id
│ flightId (FK) ──┼──→ flights.id
│ rating          │
│ comment         │
│ reviewDate      │
└─────────────────┘
```

---

## Detailed Table Structures

### 1. CITIES
Master table for city information.

| Column     | Type           | Constraints                    | Description                    |
|------------|----------------|--------------------------------|--------------------------------|
| id         | INTEGER        | PRIMARY KEY, AUTO_INCREMENT    | Unique city identifier         |
| name       | VARCHAR(100)   | NOT NULL                       | City name                      |
| country    | VARCHAR(100)   | NOT NULL                       | Country name                   |
| timezone   | VARCHAR(50)    | NULL                           | Timezone (e.g., UTC+5:30)      |
| population | INTEGER        | NULL                           | City population                |
| latitude   | DECIMAL(10,8)  | NULL                           | Geographic latitude            |
| longitude  | DECIMAL(11,8)  | NULL                           | Geographic longitude           |
| createdAt  | DATETIME       | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt  | DATETIME       | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- One-to-Many with `airports` (One city can have multiple airports)

---

### 2. AIRLINES
Airline company information.

| Column    | Type         | Constraints                    | Description                    |
|-----------|--------------|--------------------------------|--------------------------------|
| id        | INTEGER      | PRIMARY KEY, AUTO_INCREMENT    | Unique airline identifier      |
| code      | VARCHAR(3)   | NOT NULL, UNIQUE               | 3-letter airline code (e.g., AA, DL) |
| name      | VARCHAR(100) | NOT NULL                       | Airline name                   |
| country   | VARCHAR(3)   | NOT NULL                       | ISO country code (e.g., US, GB) |
| logo      | VARCHAR(255) | NULL                           | URL to airline logo            |
| website   | VARCHAR(255) | NULL                           | Airline website URL            |
| createdAt | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- One-to-Many with `airplanes` (One airline owns multiple airplanes)
- One-to-Many with `flights` (One airline operates multiple flights)

---

### 3. AIRPLANES
Aircraft fleet information.

| Column           | Type         | Constraints                     | Description                    |
|------------------|--------------|-------------------------------- |--------------------------------|
| id               | INTEGER      | PRIMARY KEY, AUTO_INCREMENT     | Unique airplane identifier     |
| airlineId        | INTEGER      | FOREIGN KEY → airlines.id, ON DELETE SET NULL, ON UPDATE CASCADE | Airline owner |
| modelNumber      | VARCHAR(50)  | NOT NULL                        | Aircraft model (e.g., Boeing 737-800) |
| capacity         | INTEGER      | NOT NULL, CHECK (capacity > 0)  | Passenger capacity             |
| manufacturer     | VARCHAR(50)  | NULL                            | Manufacturer (Boeing, Airbus)  |
| yearManufactured | INTEGER      | NULL                            | Manufacturing year             |
| status           | ENUM         | 'active', 'maintenance', 'retired' | Current airplane status    |
| createdAt        | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt        | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `airlines` (Each airplane belongs to one airline)
- One-to-Many with `seats` (One airplane has multiple seats)
- One-to-Many with `flights` (One airplane can operate multiple flights)

---

### 4. AIRPORTS
Airport information with location details.

| Column     | Type           | Constraints                    | Description                    |
|------------|----------------|--------------------------------|--------------------------------|
| id         | INTEGER        | PRIMARY KEY, AUTO_INCREMENT    | Unique airport identifier      |
| code       | VARCHAR(3)     | NOT NULL, UNIQUE               | 3-letter airport code          |
| name       | VARCHAR(100)   | NOT NULL                       | Airport name                   |
| cityId     | INTEGER        | FOREIGN KEY → cities.id, ON DELETE CASCADE, ON UPDATE CASCADE | City location |
| iataCode   | VARCHAR(3)     | NULL                           | IATA airport code              |
| latitude   | DECIMAL(10,8)  | NULL                           | Geographic latitude            |
| longitude  | DECIMAL(11,8)  | NULL                           | Geographic longitude           |
| timezone   | VARCHAR(50)    | NULL                           | Airport timezone               |
| createdAt  | DATETIME       | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt  | DATETIME       | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- Many-to-One with `cities` (Each airport belongs to one city)
- One-to-Many with `flights` (as departure airport)
- One-to-Many with `flights` (as arrival airport)

---

### 5. SEATS
Seat configuration for each airplane.

| Column       | Type        | Constraints                     | Description                    |
|--------------|-------------|---------------------------------|--------------------------------|
| id           | INTEGER     | PRIMARY KEY, AUTO_INCREMENT     | Unique seat identifier         |
| airplaneId   | INTEGER     | FOREIGN KEY → airplanes.id, ON DELETE CASCADE, ON UPDATE CASCADE | Airplane reference |
| seatNumber   | VARCHAR(5)  | NOT NULL                        | Seat number (e.g., 12A, 5C)    |
| class        | ENUM        | 'economy', 'business', 'first'  | Seat class                     |
| isWindowSeat | BOOLEAN     | DEFAULT FALSE                   | Window seat indicator          |
| isAisleSeat  | BOOLEAN     | DEFAULT FALSE                   | Aisle seat indicator           |
| createdAt    | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt    | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `airplanes` (Each seat belongs to one airplane)
- One-to-Many with `flight_seats` (Each seat can be on multiple flights)

---

### 6. FLIGHTS
Flight schedule and route information.

| Column              | Type         | Constraints                    | Description                    |
|---------------------|--------------|--------------------------------|--------------------------------|
| id                  | INTEGER      | PRIMARY KEY, AUTO_INCREMENT    | Unique flight identifier       |
| flightNumber        | VARCHAR(10)  | NOT NULL, UNIQUE               | Flight number (e.g., FL000001) |
| airlineId           | INTEGER      | FOREIGN KEY → airlines.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Operating airline |
| airplaneId          | INTEGER      | FOREIGN KEY → airplanes.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Assigned aircraft |
| departureAirportId  | INTEGER      | FOREIGN KEY → airports.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Departure airport |
| arrivalAirportId    | INTEGER      | FOREIGN KEY → airports.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Arrival airport |
| departureTime       | DATETIME     | NOT NULL                       | Scheduled departure time       |
| arrivalTime         | DATETIME     | NOT NULL                       | Scheduled arrival time         |
| duration            | INTEGER      | NULL                           | Flight duration (minutes)      |
| status              | ENUM         | 'scheduled', 'boarding', 'departed', 'arrived', 'delayed', 'cancelled' | Flight status |
| price               | DECIMAL(10,2)| NULL                           | Base ticket price              |
| boardingGate        | VARCHAR(10)  | NULL                           | Boarding gate number           |
| createdAt           | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt           | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- Many-to-One with `airlines` (Each flight operated by one airline)
- Many-to-One with `airplanes` (Each flight uses one airplane)
- Many-to-One with `airports` (departure)
- Many-to-One with `airports` (arrival)
- One-to-Many with `flight_seats` (Each flight has multiple seat assignments)
- One-to-Many with `bookings` (Each flight can have multiple bookings)
- One-to-Many with `reviews` (Each flight can have multiple reviews)

---

### 7. FLIGHT_SEATS
Seat availability and pricing for specific flights.

| Column      | Type          | Constraints                     | Description                    |
|-------------|---------------|---------------------------------|--------------------------------|
| id          | INTEGER       | PRIMARY KEY, AUTO_INCREMENT     | Unique flight seat identifier  |
| flightId    | INTEGER       | FOREIGN KEY → flights.id, ON DELETE CASCADE, ON UPDATE CASCADE | Flight reference |
| seatId      | INTEGER       | FOREIGN KEY → seats.id, ON DELETE CASCADE, ON UPDATE CASCADE | Seat reference |
| isAvailable | BOOLEAN       | DEFAULT TRUE                    | Seat availability status       |
| price       | DECIMAL(10,2) | NULL                            | Seat-specific price            |
| createdAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `flights` (Each seat assignment belongs to one flight)
- Many-to-One with `seats` (Each seat assignment references one seat)

---

### 8. USERS
User account information.

| Column      | Type         | Constraints                    | Description                    |
|-------------|--------------|--------------------------------|--------------------------------|
| id          | INTEGER      | PRIMARY KEY, AUTO_INCREMENT    | Unique user identifier         |
| email       | VARCHAR(100) | NOT NULL, UNIQUE               | User email address             |
| password    | VARCHAR(255) | NOT NULL                       | Hashed password                |
| firstName   | VARCHAR(50)  | NOT NULL                       | User's first name              |
| lastName    | VARCHAR(50)  | NOT NULL                       | User's last name               |
| phoneNumber | VARCHAR(20)  | NULL                           | Contact phone number           |
| role        | ENUM         | 'customer', 'admin', 'crew'    | User role                      |
| dateOfBirth | DATE         | NULL                           | Date of birth                  |
| passportNo  | VARCHAR(20)  | NULL                           | Passport number                |
| nationality | VARCHAR(50)  | NULL                           | User's nationality             |
| createdAt   | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt   | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- One-to-Many with `passengers` (One user can have multiple passenger profiles)
- One-to-Many with `bookings` (One user can make multiple bookings)
- One-to-Many with `reviews` (One user can write multiple reviews)

---

### 9. PASSENGERS
Passenger information for flights.

| Column         | Type        | Constraints                     | Description                    |
|----------------|-------------|---------------------------------|--------------------------------|
| id             | INTEGER     | PRIMARY KEY, AUTO_INCREMENT     | Unique passenger identifier    |
| userId         | INTEGER     | FOREIGN KEY → users.id, ON DELETE SET NULL, ON UPDATE CASCADE | Associated user account |
| firstName      | VARCHAR(50) | NOT NULL                        | Passenger's first name         |
| lastName       | VARCHAR(50) | NOT NULL                        | Passenger's last name          |
| dateOfBirth    | DATE        | NOT NULL                        | Passenger's date of birth      |
| gender         | ENUM        | 'male', 'female', 'other'       | Passenger's gender             |
| passportNumber | VARCHAR(20) | NOT NULL                        | Passport number                |
| nationality    | VARCHAR(50) | NOT NULL                        | Passenger's nationality        |
| email          | VARCHAR(100)| NULL                            | Contact email                  |
| phoneNumber    | VARCHAR(20) | NULL                            | Contact phone                  |
| createdAt      | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt      | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `users` (Each passenger profile belongs to one user)
- One-to-Many with `tickets` (One passenger can have multiple tickets)
- One-to-Many with `boarding_passes` (One passenger can have multiple boarding passes)

---

### 10. BOOKINGS
Flight booking records.

| Column      | Type          | Constraints                    | Description                    |
|-------------|---------------|--------------------------------|--------------------------------|
| id          | INTEGER       | PRIMARY KEY, AUTO_INCREMENT    | Unique booking identifier      |
| bookingRef  | VARCHAR(10)   | NOT NULL, UNIQUE               | Booking reference code         |
| userId      | INTEGER       | FOREIGN KEY → users.id, ON DELETE RESTRICT, ON UPDATE CASCADE | User who made booking |
| flightId    | INTEGER       | FOREIGN KEY → flights.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Booked flight |
| status      | ENUM          | 'pending', 'confirmed', 'cancelled', 'completed' | Booking status |
| totalAmount | DECIMAL(10,2) | NOT NULL                       | Total booking amount           |
| bookingDate | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME | Booking creation date          |
| createdAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME | Record creation timestamp      |
| updatedAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME | Record update timestamp        |

**Relationships:**
- Many-to-One with `bookings` (Each booking belongs to one user)
- Many-to-One with `flights` (Each booking is for one flight)
- One-to-Many with `tickets` (One booking can have multiple tickets/passengers)
- One-to-Many with `payments` (One booking can have multiple payments)

---

### 11. TICKETS
Individual passenger tickets for bookings.

| Column      | Type          | Constraints                     | Description                    |
|-------------|---------------|---------------------------------|--------------------------------|
| id          | INTEGER       | PRIMARY KEY, AUTO_INCREMENT     | Unique ticket identifier       |
| bookingId   | INTEGER       | FOREIGN KEY → bookings.id, ON DELETE CASCADE, ON UPDATE CASCADE | Associated booking |
| flightId    | INTEGER       | FOREIGN KEY → flights.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Flight for this ticket |
| passengerId | INTEGER       | FOREIGN KEY → passengers.id, ON DELETE RESTRICT, ON UPDATE CASCADE | Passenger details |
| seatId      | INTEGER       | FOREIGN KEY → seats.id, ON DELETE SET NULL, ON UPDATE CASCADE | Assigned seat |
| seatNumber  | VARCHAR(5)    | NULL                            | Assigned seat number           |
| class       | ENUM          | 'economy', 'business', 'first'  | Ticket class                   |
| price       | DECIMAL(10,2) | NOT NULL                        | Ticket price                   |
| status      | ENUM          | 'issued', 'checked_in', 'boarded', 'cancelled' | Ticket status |
| createdAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `bookings` (Each ticket belongs to one booking)
- Many-to-One with `flights` (Each ticket is for one flight)
- Many-to-One with `passengers` (Each ticket is for one passenger)
- Many-to-One with `seats` (Each ticket may have an assigned seat)
- One-to-Many with `baggage` (One ticket can have multiple baggage items)
- One-to-Many with `boarding_passes` (One ticket can have multiple boarding passes)

---

### 12. PAYMENTS
Payment transaction records.

| Column        | Type          | Constraints                     | Description                    |
|---------------|---------------|---------------------------------|--------------------------------|
| id            | INTEGER       | PRIMARY KEY, AUTO_INCREMENT     | Unique payment identifier      |
| bookingId     | INTEGER       | FOREIGN KEY → bookings.id, ON DELETE CASCADE, ON UPDATE CASCADE | Associated booking |
| amount        | DECIMAL(10,2) | NOT NULL                        | Payment amount                 |
| paymentMethod | ENUM          | 'credit_card', 'debit_card', 'paypal', 'bank_transfer' | Payment method |
| paymentStatus | ENUM          | 'pending', 'completed', 'failed', 'refunded' | Payment status |
| transactionId | VARCHAR(100)  | NULL, UNIQUE                    | Payment gateway transaction ID |
| paymentDate   | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Payment date                   |
| createdAt     | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt     | DATETIME      | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `bookings` (Each payment belongs to one booking)

---

### 13. BAGGAGE
Baggage information for bookings.

| Column      | Type         | Constraints                     | Description                    |
|-------------|--------------|-------------------------------- |--------------------------------|
| id          | INTEGER      | PRIMARY KEY, AUTO_INCREMENT     | Unique baggage identifier      |
| ticketId    | INTEGER      | FOREIGN KEY → tickets.id, ON DELETE CASCADE, ON UPDATE CASCADE | Associated ticket |
| type        | ENUM         | 'carry_on', 'checked', 'special' | Baggage type                  |
| weight      | DECIMAL(5,2) | NULL                            | Baggage weight (kg)            |
| status      | ENUM         | 'checked_in', 'loaded', 'in_transit', 'delivered', 'lost' | Baggage status |
| description | VARCHAR(255) | NULL                            | Baggage description            |
| createdAt   | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt   | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `tickets` (Each baggage item belongs to one ticket)

---

### 14. BOARDING_PASSES
Digital boarding pass information.

| Column       | Type        | Constraints                     | Description                    |
|--------------|-------------|---------------------------------|--------------------------------|
| id           | INTEGER     | PRIMARY KEY, AUTO_INCREMENT     | Unique boarding pass identifier|
| ticketId     | INTEGER     | FOREIGN KEY → tickets.id, ON DELETE CASCADE, ON UPDATE CASCADE | Associated ticket |
| seatNumber   | VARCHAR(5)  | NOT NULL                        | Assigned seat number           |
| boardingTime | DATETIME    | NULL                            | Boarding time                  |
| gate         | VARCHAR(10) | NULL                            | Boarding gate                  |
| status       | ENUM        | 'issued', 'boarded', 'cancelled' | Boarding pass status          |
| createdAt    | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt    | DATETIME    | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `tickets` (Each boarding pass belongs to one ticket)

---

### 15. REVIEWS
Flight reviews and ratings.

| Column     | Type         | Constraints                     | Description                    |
|------------|--------------|-------------------------------- |--------------------------------|
| id         | INTEGER      | PRIMARY KEY, AUTO_INCREMENT     | Unique review identifier       |
| userId     | INTEGER      | FOREIGN KEY → users.id, ON DELETE CASCADE, ON UPDATE CASCADE | User who wrote review |
| flightId   | INTEGER      | FOREIGN KEY → flights.id, ON DELETE CASCADE, ON UPDATE CASCADE | Reviewed flight |
| rating     | INTEGER      | NOT NULL, CHECK (rating >= 1 AND rating <= 5) | Rating (1-5 stars) |
| comment    | TEXT         | NULL                            | Review comment                 |
| reviewDate | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Review submission date         |
| createdAt  | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record creation timestamp      |
| updatedAt  | DATETIME     | NOT NULL, DEFAULT CURRENT_TIME  | Record update timestamp        |

**Relationships:**
- Many-to-One with `users` (Each review written by one user)
- Many-to-One with `flights` (Each review is for one flight)

---

## Database Statistics (Current Seed Data)

| Table          | Records  | Status |
|----------------|----------|--------|
| cities         | 20,000   | ✅     |
| airlines       | 20,000   | ✅     |
| airports       | 20,000   | ✅     |
| airplanes      | 20,000   | ✅     |
| users          | 20,000   | ✅     |
| flights        | 20,000   | ✅     |
| seats          | 19,800   | ✅     |
| flight_seats   | 0        | ⏳     |
| passengers     | 0        | ⏳     |
| bookings       | 0        | ⏳     |
| tickets        | 0        | ⏳     |
| payments       | 0        | ⏳     |
| baggage        | 0        | ⏳     |
| boarding_passes| 0        | ⏳     |
| reviews        | 0        | ⏳     |

**Total Records:** 139,800

---

## Key Relationships Summary

### Master Data Tables (Independent)
- **cities** - Base location data
- **airlines** - Airline companies
- **users** - User accounts

### Dependent Tables (1st Level)
- **airports** → cities (CASCADE)
- **airplanes** → airlines (SET NULL)
- **passengers** → users (SET NULL)

### Dependent Tables (2nd Level)
- **seats** → airplanes (CASCADE)
- **flights** → airlines, airplanes, airports (RESTRICT on all)

### Transactional Tables (3rd Level)
- **flight_seats** → flights, seats (CASCADE on both)
- **bookings** → users (RESTRICT), flights (RESTRICT)
- **reviews** → users (CASCADE), flights (CASCADE)

### Booking-Related Tables (4th Level)
- **tickets** → bookings (CASCADE), flights (RESTRICT), passengers (RESTRICT), seats (SET NULL)
- **payments** → bookings (CASCADE)

### Ticket-Related Tables (5th Level)
- **baggage** → tickets (CASCADE)
- **boarding_passes** → tickets (CASCADE)

---

## Database Constraints (Actual from Database)

### Foreign Key Constraints with Cascade Rules

#### ON DELETE CASCADE (Child records are automatically deleted)
When you delete the parent record, all related child records are automatically deleted:

| Table | Column | References | Impact |
|-------|--------|------------|--------|
| **airports** | cityId | cities.id | Delete city → Deletes all airports in that city |
| **seats** | airplaneId | airplanes.id | Delete airplane → Deletes all seats in that airplane |
| **flight_seats** | flightId | flights.id | Delete flight → Deletes all flight seat assignments |
| **flight_seats** | seatId | seats.id | Delete seat → Deletes all flight assignments for that seat |
| **payments** | bookingId | bookings.id | Delete booking → Deletes all payments for that booking |
| **tickets** | bookingId | bookings.id | Delete booking → Deletes all tickets for that booking |
| **baggage** | ticketId | tickets.id | Delete ticket → Deletes all baggage for that ticket |
| **boarding_passes** | ticketId | tickets.id | Delete ticket → Deletes all boarding passes for that ticket |
| **reviews** | flightId | flights.id | Delete flight → Deletes all reviews for that flight |
| **reviews** | userId | users.id | Delete user → Deletes all reviews by that user |

#### ON DELETE RESTRICT (Deletion is prevented if child records exist)
Cannot delete the parent record if child records exist - must delete children first:

| Table | Column | References | Protection |
|-------|--------|------------|------------|
| **flights** | airlineId | airlines.id | ❌ Cannot delete airline if it has flights |
| **flights** | airplaneId | airplanes.id | ❌ Cannot delete airplane if assigned to flights |
| **flights** | departureAirportId | airports.id | ❌ Cannot delete airport if it has departing flights |
| **flights** | arrivalAirportId | airports.id | ❌ Cannot delete airport if it has arriving flights |
| **bookings** | userId | users.id | ❌ Cannot delete user if they have bookings |
| **tickets** | flightId | flights.id | ❌ Cannot delete flight if tickets are issued |
| **tickets** | passengerId | passengers.id | ❌ Cannot delete passenger if they have tickets |

#### ON DELETE SET NULL (Foreign key is set to NULL)
When parent is deleted, the foreign key in child records becomes NULL:

| Table | Column | References | Result |
|-------|--------|------------|--------|
| **airplanes** | airlineId | airlines.id | Delete airline → airplane.airlineId becomes NULL |
| **passengers** | userId | users.id | Delete user → passenger.userId becomes NULL |
| **tickets** | seatId | seats.id | Delete seat → ticket.seatId becomes NULL |

### Cascade Effect Examples

#### Example 1: What happens if you delete an AIRLINE?

```
DELETE FROM airlines WHERE id = 1;
```

**Result:**
- ❌ **FAILS** if airline has any flights (RESTRICT constraint on flights.airlineId)
- ✅ **Succeeds** only if airline has no flights
- If succeeds: All airplanes owned by that airline have `airlineId` set to NULL (SET NULL)

**Proper deletion order:**
1. Delete all flights for that airline (or reassign to another airline)
2. Then delete the airline
3. Airplanes will remain but with `airlineId = NULL`

#### Example 2: What happens if you delete an AIRPLANE?

```
DELETE FROM airplanes WHERE id = 1;
```

**Result:**
- ❌ **FAILS** if airplane is assigned to any flights (RESTRICT constraint on flights.airplaneId)
- ✅ **Succeeds** if no flights assigned
- If succeeds: **CASCADE** - All seats for that airplane are automatically deleted

**Impact:**
```
airplanes (deleted)
   └── seats (CASCADE DELETE - removed automatically)
```

#### Example 3: What happens if you delete a CITY?

```
DELETE FROM cities WHERE id = 1;
```

**Result:**
- ✅ **Succeeds** (unless airports have flights with RESTRICT)
- **CASCADE** - All airports in that city are deleted
- If airports have flights, deletion fails due to RESTRICT on flights

**Impact:**
```
cities (deleted)
   └── airports (CASCADE DELETE - removed)
        └── flights (RESTRICT - blocks deletion if exists)
```

#### Example 4: What happens if you delete a USER?

```
DELETE FROM users WHERE id = 1;
```

**Result:**
- ❌ **FAILS** if user has any bookings (RESTRICT constraint)
- ✅ **Succeeds** if no bookings
- If succeeds:
  - All reviews by that user are deleted (CASCADE)
  - All passenger profiles linked to user have `userId` set to NULL (SET NULL)

**Impact:**
```
users (deleted)
   ├── bookings (RESTRICT - blocks deletion if exists)
   ├── passengers (SET NULL - userId becomes NULL)
   └── reviews (CASCADE DELETE - removed automatically)
```

#### Example 5: What happens if you delete a BOOKING?

```
DELETE FROM bookings WHERE id = 1;
```

**Result:**
- ✅ **Always succeeds**
- **CASCADE** - Everything related to booking is automatically deleted

**Impact:**
```
bookings (deleted)
   ├── tickets (CASCADE DELETE)
   │    ├── baggage (CASCADE DELETE via tickets)
   │    └── boarding_passes (CASCADE DELETE via tickets)
   └── payments (CASCADE DELETE)
```

#### Example 6: What happens if you delete a FLIGHT?

```
DELETE FROM flights WHERE id = 1;
```

**Result:**
- ❌ **FAILS** if any tickets are issued for this flight (RESTRICT constraint)
- ✅ **Succeeds** if no tickets exist
- If succeeds:
  - All flight_seats are deleted (CASCADE)
  - All reviews for that flight are deleted (CASCADE)

**Impact:**
```
flights (deleted)
   ├── tickets (RESTRICT - blocks deletion if exists)
   ├── flight_seats (CASCADE DELETE)
   └── reviews (CASCADE DELETE)
```

### Check Constraints
- `airplanes.capacity > 0` - Airplane must have at least 1 seat
- `reviews.rating >= 1 AND rating <= 5` - Rating must be between 1-5 stars

### Unique Constraints
- `airlines.code` - Each airline must have unique 3-letter code
- `airports.code` - Each airport must have unique 3-letter code
- `flights.flightNumber` - Each flight must have unique flight number
- `users.email` - Each user must have unique email address
- `bookings.bookingRef` - Each booking must have unique reference code
- `payments.transactionId` - Each payment must have unique transaction ID

### Data Integrity Rules

#### Safe to Delete (CASCADE will clean up):
- ✅ **Bookings** - Everything cascades down
- ✅ **Reviews** - No dependencies
- ✅ **Payments** - No dependencies

#### Requires Cleanup First (RESTRICT protection):
- ⚠️ **Airlines** - Must remove/reassign flights first
- ⚠️ **Airplanes** - Must remove flight assignments first
- ⚠️ **Airports** - Must remove flights using this airport first
- ⚠️ **Users** - Must remove bookings first
- ⚠️ **Flights** - Must remove tickets first
- ⚠️ **Passengers** - Must remove tickets first

#### Partial Cleanup (SET NULL):
- 🔄 **Airlines** (for airplanes) - Planes become unassigned
- 🔄 **Users** (for passengers) - Passenger profiles become orphaned
- 🔄 **Seats** (for tickets) - Tickets lose seat assignment

---

## Indexes (Recommended)

For optimal query performance:

```sql
-- Foreign key indexes
CREATE INDEX idx_airports_cityId ON airports(cityId);
CREATE INDEX idx_airplanes_airlineId ON airplanes(airlineId);
CREATE INDEX idx_seats_airplaneId ON seats(airplaneId);
CREATE INDEX idx_flights_airlineId ON flights(airlineId);
CREATE INDEX idx_flights_airplaneId ON flights(airplaneId);
CREATE INDEX idx_flights_departureAirportId ON flights(departureAirportId);
CREATE INDEX idx_flights_arrivalAirportId ON flights(arrivalAirportId);
CREATE INDEX idx_passengers_userId ON passengers(userId);
CREATE INDEX idx_bookings_userId ON bookings(userId);
CREATE INDEX idx_bookings_flightId ON bookings(flightId);

-- Search optimization
CREATE INDEX idx_flights_departureTime ON flights(departureTime);
CREATE INDEX idx_flights_status ON flights(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_bookings_bookingRef ON bookings(bookingRef);
```

---

## Notes

1. **Timestamps**: All tables include `createdAt` and `updatedAt` for audit trail
2. **Soft Deletes**: Can be implemented by adding `deletedAt` column
3. **Data Integrity**: Foreign keys ensure referential integrity
4. **Scalability**: Designed to handle millions of records with proper indexing
5. **Normalization**: Database is in 3rd Normal Form (3NF)
