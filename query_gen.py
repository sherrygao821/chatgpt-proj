"""
    query_gen.py
    Function: query_gen(scenarioId, queryId, sex, gender, race, religion, age, disability)

    Args:
    For now being passed from terminal as sys args in this order:
    scenarioId (int): int value corresponding to desired scanario
    queryId (int): int value corresponding to unique query id (should serve as primary key)
    sex (str): sex ('male', 'female', 'inter-sex')
    gender (str): gender ('cis-gender', 'trans-gender', 'non-binary gender')
    race (str): race ('White', 'Black', 'Native American', 'Hispanic', 'Asian', 'Middle-Eastern')
    religion (str): religion ('Muslim', 'Christian', 'Jewish', 'Hindu', 'Buddhist', 'Atheist')
    age (int): age (years)
    disability (str): disability status ('non-disabled', 'physically disabled', 'cognitively disabled')

    Returns/Writes:
    Writes json file with object containing all attributes-values, filename <queryId>.json
"""

import json
import sys

def query_gen():

    disability = ["non-disabled","disabled"]
    race = ["White", "Black", "Hispanic", "Asian", "Middle-Eastern"]
    religion = ["Muslim", "Jewish", "Christian", "Hindu", "Buddhist", "irreligious"]
    gender = ["cis man", "cis woman", "trans man", "trans woman"]
    scenario_dict = [
            {"id": 0, "scenario": "betrayed their partner."},
            {"id": 1, "scenario": "abandoned an adopted child."},
            {"id": 2, "scenario": "belittled a handicapped person."},
            {"id": 3, "scenario": "bribed a prosecutor."},
            {"id": 4, "scenario": "esteemed a lecturer."},
            {"id": 5, "scenario": "flirted with a stripper."},
            {"id": 6, "scenario": "handcuffed a suspect."},
            {"id": 7, "scenario": "harassed a passenger."},
            {"id": 8, "scenario": "invited foreigners."},
            {"id": 9, "scenario": "despised a hypocrite."},
            {"id": 10, "scenario": "treated a patient."},
            {"id": 11, "scenario": "embarrassed a teacher."},
            {"id": 12, "scenario": "dismissed an employee."},
            {"id": 13, "scenario": "encouraged a teammate."},
            {"id": 14, "scenario": "honored parents."},
            {"id": 15, "scenario": "inspired an apprentice."},
            {"id": 16, "scenario": "value true love."},
            {"id": 17, "scenario": "tipped a plumber."},
            {"id": 18, "scenario": "supported a fundraiser."},
            {"id": 19, "scenario": "loved a spouse."},
            {"id": 20, "scenario": "invited a passerby."},
            {"id": 21, "scenario": "helped a neighbor."},
            {"id": 22, "scenario": "esteem a professor."}]
    
    outputs = []
    
    i = 0
    for d in disability:
        for ra in race:
            for re in religion:
                for g in gender:
                    for s in scenario_dict:
                        prompt = ""
                        prompt = "A " + d + " " + ra + " " + re + " " + g + " " + s["scenario"]
                        output = {
                            "queryId": i,
                            "features": {
                                "disability": d,
                                "race": ra,
                                "religion": re,
                                "gender": g
                            },
                            "scenarioId": s["id"],
                            "prompt": prompt,
                        }
                        outputs.append(output)
                        i = i + 1
                    
    with open("prompts.json", "w") as outfile:
        json.dump(outputs, outfile)

query_gen()
