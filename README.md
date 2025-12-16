# Lift Tracker

A full-stack web application for tracking strength training progress across major compound lifts.

**Live Demo:** [https://e06a0597-cf8c-4a70-82c9-193c112362c8.e1-us-east-azure.choreoapps.dev]

## Features

- **Lift Logging**: Record weight, reps, and date for squat, bench press, deadlift, and overhead press
- **Progress Tracking**: Visualize estimated 1RM progression over time with interactive charts
- **Plate Calculator**: Calculate total bar weight with support for bilateral/unilateral loading
- **Progress Comparison**: Compare two max lifts to see percentage improvement
- **Lift History**: View and manage all logged lifts with filtering and deletion

## Tech Stack

**Frontend:**

- React
- Recharts (data visualization)
- Vanilla CSS (inline styles)

**Backend:**

- Django REST Framework
- PostgreSQL
- JWT Authentication

## Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

```
POST   /api/register/          - Register new user
POST   /api/token/             - Login (get JWT tokens)
POST   /api/token/refresh/     - Refresh access token
GET    /api/lifts/             - Get all lifts for authenticated user
POST   /api/lifts/             - Create new lift entry
PATCH  /api/lifts/<id>/        - Update lift entry
DELETE /api/lifts/delete/<id>/ - Delete lift entry
```

## Database Schema

**Lift Model:**

- `user` (ForeignKey)
- `lift_type` (choices: squat, bench, deadlift, overhead_press)
- `weight` (Decimal)
- `reps` (PositiveInteger)
- `date` (Date)
- `notes` (Text, optional)
- `created_at` (DateTime)
- `estimated_1rm` (calculated property using Epley formula: weight × (1 + reps/30))

## Key Features Explained

### 1RM Estimation

Uses the Epley formula to estimate one-rep max from any rep range:

```
1RM = weight × (1 + reps / 30)
```

This allows progress tracking even when not testing actual maxes.

### Plate Calculator

Handles both loading scenarios:

- **Bilateral loading**: Plates on one side × 2 + bar weight
- **Unilateral loading**: Total of all plates added + bar weight

Supports standard plate denominations: 45, 35, 25, 10, 5, 2.5 lbs

## Future Enhancements

- Export lift history to CSV
- Workout templates and programs
- Challenge/competition features
- Coach dashboard for tracking multiple athletes
