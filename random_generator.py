
import random

def generate_random_numbers():
    numbers = random.sample(range(1, 46), 6)
    numbers.sort()
    return numbers
