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
        {
            "id": 0,
            "scenario": "betrayed their partner."
        }]
    
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
