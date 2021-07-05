import React, {useState} from 'react';
import {Box, MenuItem, Select, TextField, Typography} from "@material-ui/core/index";
import _ from "lodash";

export default function App() {
    const lineFormats = ["1h30m4s"]
    const operations = ["Sum"]

    const [input, setInput] = useState("")
    const [selectedFormat, setSelectedFormat] = useState(lineFormats[0])
    const [selectedOperation, setSelectedOperation] = useState(operations[0])

    const [resultHours, resultMinutes, resultSeconds] = input.split("\n")
        .map(line => line.trim())
        .filter(line => !_.isEmpty(line))
        .map(line => {
            const regex = /^((?<hours>\d+)h)?((?<minutes>\d+)m)?((?<seconds>\d+)m)?$/g;
            const match = regex.exec(line);
            const hours = parseInt(match?.groups?.hours || "0");
            const minutes = parseInt(match?.groups?.minutes || "0");
            const seconds = parseInt(match?.groups?.seconds || "0");
            return [hours, minutes, seconds]
        })
        .reduce((previousValue, currentValue) => {
            const [prevHours, prevMinutes, prevSeconds] = previousValue
            const [currHours, currMinutes, currSeconds] = currentValue
            const totalSeconds = prevHours * 3600 + currHours * 3600 + prevMinutes * 60 + currMinutes * 60 + prevSeconds + currSeconds
            const resultHours = Math.floor(totalSeconds / 3600)
            const resultMinutes = Math.floor(totalSeconds / 60 % 60)
            const resultSeconds = Math.floor(totalSeconds % 60)
            return [resultHours, resultMinutes, resultSeconds]
        }, [0, 0, 0])

    const result = `${resultHours}h${resultMinutes}m${resultSeconds}s`

    return <Shell>
        <Typography variant={"h2"}>Time Calculator</Typography>
        <Box
            display={"grid"}
            gridTemplateColumns={"auto"}
            gridGap={"16px"}
            p={"32px"}
            width={"100%"}
        >
            <Typography variant={"h4"}>Operation</Typography>
            <Select
                variant={"filled"}
                value={selectedOperation}
                onChange={event => setSelectedOperation(event.target.value as string)}
            >
                {operations.map(operation =>
                    <MenuItem key={operation} value={operation}>{operation}</MenuItem>
                )}
            </Select>
            <Typography variant={"h4"}>Line Format</Typography>
            <Select
                variant={"filled"}
                value={selectedFormat}
                onChange={event => setSelectedFormat(event.target.value as string)}
            >
                {lineFormats.map(format =>
                    <MenuItem key={format} value={format}>{format}</MenuItem>
                )}
            </Select>
            <Typography variant={"h4"}>Input</Typography>
            <TextField
                variant={"filled"}
                multiline={true}
                rows={10}
                value={input}
                onChange={event => setInput(event.target.value as string)}
            />
            <Typography variant={"h4"}>Result</Typography>
            <TextField
                variant={"filled"}
                value={result}
            />
        </Box>
    </Shell>
}

function Shell(params: { children: any }) {
    return <Box
        display={"grid"}
        justifyItems={"center"}
        width={"100%"}
    >
        <Box
            display={"grid"}
            justifyItems={"center"}
            p={"32px"}
            width={"calc(100% - 32px)"}
            maxWidth={"960px"}
        >
            {params.children}
        </Box>
    </Box>
}
