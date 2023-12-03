lines = []
with open("./input.txt", "r") as file:
    lines = [line.strip() for line in file.readlines()]


rows = len(lines)
cols = len(lines[0])


def get_line(index: int) -> str | None:
    if index < 0:
        return None
    try:
        return lines[index]
    except (ValueError, IndexError):
        return None


def isSymbol(c: str) -> bool:
    return (not c.isdigit()) and c != "."


ops: list[int] = [-1, 0, 1]

gearDict = {}


def is_part_valid(lineIndex: int, startIndex: int, length: int, gear) -> bool:
    end_index = (
        startIndex + length if startIndex + length == cols else startIndex + length + 1
    )
    start_index = startIndex if startIndex == 0 else startIndex - 1

    for x in ops:
        tempIndex = lineIndex + x
        line = get_line(tempIndex)
        if line:
            for i, x in enumerate(line):
                if i < start_index or i >= end_index:
                    continue

                if isSymbol(x) and x == "*":
                    tempGearIndex = f"{tempIndex}:{i}"
                    if gearDict.get(tempGearIndex):
                        gearDict[tempGearIndex].append(int(gear))
                    else:
                        gearDict[tempGearIndex] = [int(gear)]
                    return True
    return False


part_nums: list[int] = []

for index, line in enumerate(lines):
    temp: str = ""
    start_index: int = -1

    for i, char in enumerate(line):
        if char.isdigit():
            if start_index < 0:
                start_index = i
            temp += char

        if not char.isdigit() or i + 1 == cols:
            if start_index >= 0:
                isValid: bool = is_part_valid(index, start_index, len(temp), temp)
                if isValid:
                    # part_nums.append(int(temp))
                    pass
                else:
                    # print(temp)
                    pass
            start_index = -1
            temp = ""

sum = 0
for x in gearDict.keys():
    if len(gearDict[x]) == 2:
        sum += gearDict[x][0] * gearDict[x][1]
print(sum)

