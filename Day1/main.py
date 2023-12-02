calibration_value: list[int] = []

digits_in_words = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}
ListofKeys = list(digits_in_words.keys())


def getLastDigit(line : str) -> str | None:
    temp = ""
    for x in line[::-1]:
        if x.isdigit():
            return str(x)
        else:
            temp = x + temp
            temp_list = [x for x in ListofKeys if x.endswith(temp)]
            if len(temp_list) == 0:
                temp = temp[0:len(temp) - 1]
            if digits_in_words.get(temp):
                return str(digits_in_words[temp])
    return None
            
def get_first_digit(line : str) -> tuple[int, str]:
    temp = ""
    for index, char in enumerate(line):
        if(char.isdigit()):
            return index , char
        else:
            temp = temp + char
            l : list[str] = [x for x in ListofKeys if x.startswith(temp)]
            if len(l) == 0:
                temp = temp[1:]
            if digits_in_words.get(temp) != None:
                return index, str(digits_in_words[temp])



def part_one() -> None:
    with open("./input.txt", "r") as input:
        for line in input:
            temp: str = ""
            for char in line:
                if char.isdigit():
                    if len(temp) == 0:
                        temp = char
                    else:
                        x = temp[0] + char
                        temp = x
            if len(temp) == 1:
                temp = temp * 2
            calibration_value.append(int(temp))
    print(sum(calibration_value))

def part_two() -> None:
    calibration_value.clear()
    with open("./input.txt", "r") as input:
        for line in input:
            index, first_digit = get_first_digit(line)
            last_digit = getLastDigit(line[index + 1:])
            if last_digit != None:
                calibration_value.append(int(first_digit + last_digit))
            else:
                calibration_value.append(int(first_digit*2))
    print(sum(calibration_value))
    
part_two()
# part_one()