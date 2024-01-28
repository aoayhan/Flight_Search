import random
import datetime
from datetime import timedelta
import os
import json

# Function to generate a random flight data with realistic times
def generate_realistic_flight_data(num_flights):
    airlines = ["Amadeus Air", "Jetstream Airways", "Skyward Express"]
    airports = ["LAX", "IST", "SAW", "HND", "JFK", "ADB", "FRA", "LCY", "CPH", "ZRH", "PEK", "SVO"]
    cities = {
        "LAX": "Los Angeles", "IST": "Istanbul", "SAW": "Istanbul", "HND": "Tokyo",
        "JFK": "New York", "ADB": "Izmir", "FRA": "Frankfurt", "LCY": "London", "CPH": "Copenhagen",
        "ZRH": "Zurich", "PEK": "Beijing", "SVO": "Moscow"
    }

    flight_durations = {tuple(sorted([a1, a2])): random.randint(1, 12) for a1 in airports for a2 in airports if a1 != a2}

    flight_data = []

    for _ in range(num_flights):
        variance = random.choice([-1, 0, 1])
        flight_id = "FL" + str(random.randint(100, 999))
        airline = random.choice(airlines)
        departure_airport, arrival_airport = random.sample(airports, 2)
        departure_date = datetime.date.today() + timedelta(days=random.randint(1, 340))
        departure_time = datetime.time(hour=random.randint(0, 23), minute=random.choice([0, 10, 15, 30, 45, 50]))
        flight_duration_hours = flight_durations[tuple(sorted([departure_airport, arrival_airport]))]
        total_flight_duration = flight_duration_hours + variance

        departure_datetime = datetime.datetime.combine(departure_date, departure_time)
        arrival_datetime = departure_datetime + timedelta(hours=total_flight_duration)
        arrival_date = arrival_datetime.date()
        arrival_time = arrival_datetime.time().replace(second=0, microsecond=0)

        price = random.randint(300, 2000)

        flight = {
            "id": flight_id,
            "airline": airline,
            "departureAirport": {
                "code": departure_airport,
                "city": cities[departure_airport]
            },
            "arrivalAirport": {
                "code": arrival_airport,
                "city": cities[arrival_airport]
            },
            "departureDate": str(departure_date),
            "departureTime": departure_time.strftime("%H:%M"),
            "arrivalDate": str(arrival_date),
            "arrivalTime": arrival_time.strftime("%H:%M"),
            "price": price,
            "duration": total_flight_duration
        }

        flight_data.append(flight)

    return flight_data


realistic_sample_flight_data = generate_realistic_flight_data(100000)

filepath = "D:\anil\mock-flights.txt"


with open(filepath, 'w') as file:
    
    for dictionary in realistic_sample_flight_data:
        json_string = json.dumps(dictionary)
        file.write(json_string + ", ")
