// Learn more about F# at http://fsharp.net
// See the 'F# Tutorial' project for more help.

// http://msdn.microsoft.com/en-us/library/dd233160.aspx
//let rec factorial n = 
//    if n = 0
//    then 1 
//    else n * factorial (n - 1)
//
//let rec printFactorials n =
//    printfn "%5i! = %A" n (factorial n)
//    if n > 1 then printFactorials (n - 1)
//
//[<EntryPoint>]
//let main argv = 
//    printfn "%A" argv
//    printfn "%d" (factorial 6)
//    printFactorials 30
//    System.Console.ReadLine() |> ignore    // The brackets make a difference here.
//    0 // return an integer exit code



let rec factorial n = 
    if n = 0L
    then 1L 
    else n * factorial (n - 1L)

let rec printFactorials n =
    printfn "%5d! = %A" n (factorial n)
    let f = float (factorial n)
    printfn "%5d! = %f" n f
    if n > 1L then printFactorials (n - 1L)

// Not explicitly specifying a signature (see http://en.wikibooks.org/wiki/F_Sharp_Programming/Pattern_Matching_Basics).
// Looks like the signature is not being defined but matched dynamically.
let rec factorial' = function
    | 0 | 1 -> 1
    | x -> x * factorial'(x - 1)
    //| (x, y) -> 42    // This being illegal suggest we cannot just call with any number of parameters, as in JS.

let rec fib = function
    | 0 -> 0
    | 1 -> 1
    // This going to be very slow as 2 recursive calls: 1, 2, 4, ... 2 ^ 46 = 7E13
    // Really want to just store previous calculations as go along.
    | x when x > 1 -> fib(x - 2) + fib (x - 1)
    | _ -> failwith "must be called with non-negative int"

// Or just use the formula (need something extra to convert between int and float domains).
let sqrt5 = sqrt 5.0
let fib' x =
    sqrt5 / 5.0 * ((1.0 + sqrt5) / 2.0) ** x - ((1.0 - sqrt5) / 2.0) ** x       // http://rybkaforum.net/cgi-bin/rybkaforum/topic_show.pl?tid=15843

let fib'' (x: int) =
    int (fib' (float x))

let rec triangle = function
    | 0 -> 0
    | 1 -> 1
    | x when x > 1 -> x + triangle (x - 1)
    | _ -> failwith "must be called with non-negative int"

let factorialTests argv = 
    printfn "%A" argv
    printfn "%d" (factorial 6L)
    printFactorials 30L
    printfn "factorial' 6 = %d" (factorial' 6)

    //printfn "%d" (fib -5)
    printfn "Fibonacci:"
    for i in [0..20] do
        printf "%A," (i, fib i)
    printfn ""

    printfn "Triangles:"
    for i in [0..2..50] do
        printf "%A," (i, triangle i)
    printfn ""

//---------------------------------------------------------------------------------------------

let multiply' = fun x y -> x * y
let multiply x y = x * y
let triple x = multiply x 3

let add' = fun x y -> x + y
// functions always in CURRIED format -> -> ->     add' and add'' both have same signature
let add'' x = fun y -> x + y

// Use >> or << to combine functions.

let basicFunctionTests argv = 
    // Functions.
    printfn "triple 9 = %d" (triple 9) 
    printfn "multiply' 27 3 = %d" (multiply' 27 3) 

    let calc = 35 |> add'' 5 |> multiply' 4
    printfn "35 |> add'' 5 |> multiply' 4 = %d" calc

//---------------------------------------------------------------------------------------------

type CarType =
    | ThreeWheeler = 0
    | FourWheeler = 1
    | HeavyLoadCarrier = 2
    | ReallyLargeTruck = 3
    | CrazyHugeMythicalMonster = 4
    | WeirdContraption = 5

[<AbstractClass>]
type Vehicle() = 
    abstract PassengerCount: int with get, set

type Car (color: string, wheelCount: int) = 
    do
        if wheelCount < 3 then failwith "must have at least three wheels"
        if wheelCount > 100 then failwith "that's ridiculous"

    let carType =
        match wheelCount with
        | 3 -> CarType.ThreeWheeler
        | 4 -> CarType.FourWheeler
        | 6 -> CarType.HeavyLoadCarrier
        | x when x % 2 = 1 -> CarType.WeirdContraption
        | _ -> CarType.CrazyHugeMythicalMonster

    let mutable passengerCount = 0
    //member x.PassengerCount with get() = passengerCount and set v = passengerCount <- v
    abstract PassengerCount: int with get, set
    default x.PassengerCount with get() = passengerCount and set v = passengerCount <- v

    new() = Car("red", 4)

    member x.Move = printfn "The %s car (%A) is moving" color carType

type Red18Wheeler() =
    inherit Car("red", 18)

    override x.PassengerCount
        with set v =
            if v > 2 then failwith "only two passengers allowed"
            else base.PassengerCount <- v

let typeTests1 argv = 
    let car = Car()
    let car2 = Car("green", 5)
    car2.Move
    car2.PassengerCount <- 3
    printfn "The car has %d passengers" car2.PassengerCount

    let bigLorry = Red18Wheeler()
    printfn ""

//---------------------------------------------------------------------------------------------

let t1 = 3, true, "hello"
let v1, v2, v3 = t1
let _, _, message1 = t1
let t2 = 3, true

let tupleTests argv = 
    printfn "%s" message1
    printfn "%A" (fst t2)
    printfn "%A" (snd t2)
    // This appears to be an error. It seems to infer the expected type by creating a tuple from the first two types in t1 (int * bool)
    // but then complains that t1 is a (int * bool * string). Conclusion only works with 2-tuples.
//    let v22 = fst t1

    let third' (_, _, r) = r
    printfn "%A" (third' t1)    // "hello"

    printfn ""

//---------------------------------------------------------------------------------------------

let o1 = Some(5)
let o2 = None       // Untyped

let checkOption o =
    match o with
    | Some(x) -> printfn "Option contains value %A" x
    | None -> printfn "Option doesn't have a value"

let checkOption' o = function
    | Some(x) -> printfn "Option contains value %A" x
    | None -> printfn "Option doesn't have a value"

let optionTypeTests argv = 
    // Like Nullable<'T>. Technically they are discriminated unions.

    if o1 <> o2 then
        printfn "Values are not equal"

    checkOption o1
    checkOption o2

    printfn ""

//---------------------------------------------------------------------------------------------

let empty = []  // No actual type (just generic)
let intList = [2;5;7;9]

// Need to specify the type as need to access one of the properties and a type is never inferred by a memeber that has been accessed.
// Bit pants.
let rec listLength (l: 'a list) =
    if l.IsEmpty then 0
    else 1 + (listLength l.Tail)

let rec listLength' l = 
    match l with
    | [] -> 0
    | _ :: xs -> 1 + (listLength' xs)

    // NOTE: Need to remove the final parameter when using this notation. OR is it ALL the parameters?
    // CONFUSED: checkOption' (above seems to work with or without the o parameter). 
let rec listLength'' = function
    | [] -> 0
    | _ :: xs -> 1 + (listLength'' xs)

let rec takeFromList n l = 
    match n, l with
    | 0, _ -> []
    | _, [] -> []
    | _, (x :: xs) -> x :: (takeFromList (n - 1) xs)

// The problem here was that this meant that the inferred type was   int * 'a list -> 'a list   , i.e. a tuple parameter was expected.
// The match notation allowed a tuple to be created from the parameters and then matched.     int -> 'a list -> 'a list
let rec takeFromList' = function
    | n, _ when n <= 0 -> []
    | _, [] -> []
    | n, (x :: xs) -> x :: (takeFromList' ((n - 1), xs))

// cons operator (prepend).
let prependItem xs x = x :: xs

let processingListTests argv = 
    printfn "intList: %A" intList
    let newIntList = prependItem intList 100
    printfn "newIntList: %A" newIntList
    printfn "appending with @ : %A" (intList @ [10; 20; 30])        // Two lists.
    //printfn "prepending with :: : %A" (intList :: [10; 20; 30])     // Illegal the LHS should be SINGLE with RHS a list.
    printfn "prepending with :: : %A  However can only prepend one item." (3 :: [10; 20; 30])

    printfn ""
    printfn ".Head %A" intList.Head     // One item
    printfn ".Tail %A" intList.Tail     // The rest of the list
    printfn ".Tail.Tail.Head %A" intList.Tail.Tail.Head
    printfn ""
    printfn "listLength intList.Tail = %A" (listLength intList.Tail)
    printfn "listLength' intList = %A" (listLength' intList)
    printfn "listLength'' intList = %A" (listLength'' intList)
    printfn "takeFromList 2 intList = %A" (takeFromList 2 intList)
    printfn "takeFromList' 2 intList = %A" (takeFromList' (2, intList))

    printfn ""

//---------------------------------------------------------------------------------------------

let output x = printfn "%200A" x
let timesTable step = [step..step..step * 20]

// http://blogs.msdn.com/b/chrsmith/archive/2008/07/10/mastering-f-lists.aspx
let listTests argv = 
    printfn "Times tables:"
    for i in seq { 1..20 } do 
        output (timesTable i) 
    //for i in 1..12 -> output (timesTable i) 
    printfn ""

//---------------------------------------------------------------------------------------------

// Same for lists, sequances (and arrays).

let listAndSequenceComprehensionsTests argv = 
    let ints = [7..13]
    output ints

    let oddValues = [1..2..20]
    output oddValues

    output (seq { 7..13 })
    output [ for x in 7..13 -> x, x * x ]
    // He did a multiline lambda with a printfn "literal" - it printed all those lines before showing the list.
    output (seq { for x in 7..13 -> x, x * x })

    // sequenceTests below was part of this video.

    printfn ""

//---------------------------------------------------------------------------------------------

let sequence1 = seq { 2..4..22 }
let yieldedValues =
    seq {
        yield 3;
        yield 42;
        for i in 1..3 do
            yield i
        yield! [5;7;8]
    }

let sequenceTests argv = 
    output yieldedValues                // Not quite what expected (I think it is some sort of symbolic notation).
    output (List.ofSeq yieldedValues)
    printfn ""

//---------------------------------------------------------------------------------------------

// Discriminated unions are the MOST IMPORTANT data structures in many functional programming languages.

// The list functions made above are example of discriminated unions that are recursive (can be very powerful).

type myEnum =
    | First = 0
    | Second = 1

type Product =
    | OwnProduct of string
    | SupplierReference of int

let p1 = Product.OwnProduct("bread");
let p2 = Product.SupplierReference(53);

type Count = int // alias, presumably

type StockBooking = 
    | Incoming of Product * Count
    | Outgoing of Product * Count

let discriminatedUnionsTests argv = 
    printfn ""

//---------------------------------------------------------------------------------------------

let recordTests argv = 
    printfn ""

//---------------------------------------------------------------------------------------------

let interfaceTests argv = 
    printfn ""

//---------------------------------------------------------------------------------------------

let typeTests argv = 
    printfn ""

//---------------------------------------------------------------------------------------------


let endProgram() =
    System.Console.ReadLine() |> ignore    // The brackets make a difference here.
    0 // return an integer exit code

// CURRENTLY UP TO: "Demo: Discriminated Unions" (about half way through).

[<EntryPoint>]
let main argv = 
    factorialTests argv
    basicFunctionTests argv
    typeTests1 argv
    tupleTests argv
    optionTypeTests argv

    processingListTests argv
    listTests argv
    listAndSequenceComprehensionsTests argv
    sequenceTests argv

    discriminatedUnionsTests argv
    recordTests argv

    endProgram()




