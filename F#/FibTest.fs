module FibTest

open System

let withThousandsSeparator (i: int64) =
    String.Format("{0:#,##0}", i)
    
let withThousandsSeparator2 (i: float) =
    String.Format("{0:#,##0}", i)
    
let duration f = 
    let start = DateTime.Now
    let returnValue = f()
    let ``end`` = DateTime.Now
    let duration = ``end`` - start
    printfn "Elapsed Time: %sms (%s ticks)"
            (duration.TotalMilliseconds |> withThousandsSeparator2)
            (duration.Ticks |> withThousandsSeparator)
    returnValue

// Basic recursive attempt. Just a bit inefficient.
let rec fib = function
    | 0 -> int64 0
    | 1 -> int64 1
    // This going to be very slow as 2 recursive calls every time: 1, 2, 4, ... 2 ^ 46 (= 7E13), ...
    | x when x > 1 -> fib(x - 2) + fib(x - 1)
    | _ -> failwith "must be called with non-negative int"
    
// Instead try storing previous calculations as go along.
let fib' = function
    | 0 -> int64 0
    | 1 -> int64 1
    | x when x > 1 ->
        let fibSeq = Seq.unfold(fun (a, b) -> Some(a + b, (b, a + b)))(int64 0, int64 1)
        let fibList = fibSeq |> Seq.take(x - 1) |> Seq.toList
        List.nth fibList (x - 2)
    | _ -> failwith "must be called with non-negative int"

// Or just use the formula (need something extra to convert between int and float domains).
let sqrt5 = sqrt 5.0
let fib'' = function
    | 0 -> int64 0
    | x when x > 0 ->
        let x' = double x
        let n = sqrt5 / 5.0 * ((1.0 + sqrt5) / 2.0) ** x' - ((1.0 - sqrt5) / 2.0) ** x'       // http://rybkaforum.net/cgi-bin/rybkaforum/topic_show.pl?tid=15843
        int64 (Math.Round(n))
    | _ -> failwith "must be called with non-negative int"
   
// Much beyond 35 first one starts to really struggle.    
for x in [0..35] do
    printf "\r\n%i:\r\n" x
    // duration function causes the time taken to be printed before each line below.
    printf "Fibonacci with recursion (O2n): %i\r\n" (duration(fun() -> fib x))
    printf "Fibonacci with caching: %i\r\n" (duration(fun() -> fib' x))
    printf "Fibonacci with formula: %i\r\n" (duration(fun() -> fib'' x))

// OBSERVATION: It might be faster but, beyond 70, the third method starts to become inaccurate due to floating point doubles only
//              guaranteed to be accurate to 15 decimal places.
// CONCLUSION: Second method (caching) is best as it will hold its accuracy. 
// NOTE: Beyond 92 int64 not big enough to hold result.  
for x in [35..93] do
    printf "\r\n%i:\r\n" x
    printf "Fibonacci with caching: %i\r\n" (duration(fun() -> fib' x))
    printf "Fibonacci with formula: %i\r\n" (duration(fun() -> fib'' x))
    
// Have to go much higher to notice difference between second and third.
for x in [300000..300010] do
    printf "\r\n%i:\r\n" x
    printf "Fibonacci with caching: %i\r\n" (duration(fun() -> fib' x))
    printf "Fibonacci with formula: %i\r\n" (duration(fun() -> fib'' x))
