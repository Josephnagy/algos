// Diet Plan Performance 
// https://leetcode.com/problems/diet-plan-performance/

// input: 
// calories: array of calories (ie: [1,2,3,4,5])
// k: how many days we should consider at a time (ie our WINDOW SIZE)
// lower + upper: bounds to determine points for given days 
// -> ie if calories for a span < lower -> totalPoints--
// -> ie if calories for a span > upper -> totalPoints++

// return: total points 

var dietPlanPerformance = function (calories, k, lower, upper) {
    // initalize total points to 0 
    let totalPoints = 0;

    // initalize sequenceCalories to 0
    // --> numeric representation of our window 
    let sequenceCalories = 0;

    // for each element in the array 
    for (let i = 0; i <= calories.length; i++) {
        // add day's calories to sequence calories 
        sequenceCalories += calories[i];

        // if our window isn't big enough, just keep growing it
        // --> keep adding calories to sequenceCalories
        if (i + 1 < k) {
            continue;
        }

        // if our window is too big (ie needs to be shrunk)
        // this will always run once i gets big enough 
        if (i + 1 > k) {
            // remove calories from leftBound of window 
            sequenceCalories -= calories[i - k];
        }

        // compare sequenceCalories to lower+upper -> update total points 
        if (sequenceCalories < lower) totalPoints -= 1;
        if (sequenceCalories > upper) totalPoints += 1;
    }

    return totalPoints;
};

// ========================================================================
// Maximum Number of Vowels in a Substring of Given Length
// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

// Overview: vowelCount represents my "sliding window" by tracking how mnay vowels 
// are in the current sliding window. We don't care about non-vowel chars so we 
// completely ignore them 

// Runtime: O(n), Space Complexity: O(1)
var maxVowels = function (s, k) {
    // create object to store vowels in 
    const vowels = {
        'a': true,
        'e': true,
        'i': true,
        'o': true,
        'u': true,
    }


    // initalize vowelCount to 0
    let vowelCount = 0;
    // initalize maxVowelCount to 0 
    let maxVowelCount = 0;

    // for each char in s 
    for (let i = 0; i < s.length; i++) {
        // if char is vowel, add to vowelCount 
        if (vowels[s[i]]) {
            vowelCount++;
        }

        // if window has reached desired width 
        // do this every iteration after window size reaches k 

        if (i > k - 1 && vowels[s[i - k]]) {
            // shrink window on leftBound to keep window size k 
            // do this every iteration after window size reaches k 
            // if last character in window (that's about to be lost) is vowel
            // decrement vowelCount
            vowelCount--;
        }

        // if vowelCount > maxVowelCount 
        if (vowelCount > maxVowelCount) {
            maxVowelCount = vowelCount;
        }
    }
    return maxVowelCount;
};

// ========================================================================
// Minimum Swaps to Group All 1's Together
// https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/

var minSwaps = function (data) {
    // get total number of 1s in array via filter.length 
    const totalOnes = data.filter(num => num === 1).length;

    // initalize windowOnes to 0
    let windowOnes = 0;
    // initalize maxWindowOnes to 0
    let maxWindowOnes = 0;

    // for each num in data 
    for (let i = 0; i < data.length; i++) {
        // increase bound of window 
        // if data[i] is a 1, increment windowOnes
        if (data[i] === 1) windowOnes++;

        // if window has reached totalOnes size 
        // AND left-most element in window is a 1
        // decrease window size by decrementing windowOnes 
        if (i > totalOnes - 1 && data[i - totalOnes] === 1) {
            windowOnes--;
        }
        // if windowOnes > maxWindowOnes
        if (windowOnes > maxWindowOnes) {
            // update
            maxWindowOnes = windowOnes;
        }
    }

    return totalOnes - maxWindowOnes;

};

// ========================================================================
// Grumpy Bookstore Owner
// https://leetcode.com/problems/grumpy-bookstore-owner/

// input: 
// customers: array represents # customers in store at ith minute 
// grumpy: array represents if owner is grumpy at ith minute 
// minutes: int represents how long chill pill can last

// APPROACH 
// iterate through arrays with sliding window of size minutes
// maximize maxCustomerLoss within sliding window -> this is where to use chill pill
// count how many customers are helped when owner isn't grumpy 

// return customerCount + maxCustomerLoss 


// Time Complexity: O(n), Space: O(1)

var maxSatisfied = function (customers, grumpy, minutes) {
    // initalize counters to 0 
    let maxCustomerLoss = customerLoss = customerCount = 0;


    // iterate through arrays 
    for (let i = 0; i < customers.length; i++) {

        (grumpy[i] === 1)
            // if owner is grumpy -> add customers to customerLoss 
            ? customerLoss += customers[i]
            //else -> add customers to customerCount 
            : customerCount += customers[i]


        // if window size has reached size of minutes AND
        // customers at left bound of window dealt with grumpy owner 
        if (i >= minutes - 1 && grumpy[i - minutes] === 1) {
            // remove those customers from customerLoss
            customerLoss -= customers[i - minutes];
        }
        // update maxCustomerLoss
        maxCustomerLoss = Math.max(maxCustomerLoss, customerLoss);
    }


    return customerCount + maxCustomerLoss

};

// ========================================================================
// Max Consecutive Ones III
// https://leetcode.com/problems/max-consecutive-ones-iii/


var longestOnes = function (nums, k) {
    // intialize counters 

    // will be updated every time + returned at end 
    let maxConsecutiveOnes = 0;
    // represents our sliding window
    let currConsecutiveOnes = 0;
    // represents how many zeros we have in our sliding window 
    let zeros = 0;
    // pointer to update the sliding window when we violate window rule 
    // --> ie we have more than K zeros in our window 
    let leftPointer = 0;

    // iterate through nums 
    for (let i = 0; i < nums.length; i++) {
        // add num to currConsecutiveOnes
        currConsecutiveOnes++;

        // increase count of zeros if you find one 
        if (nums[i] === 0) {
            zeros++;
        }

        // shrink window until zeros <= k 
        // prevent leftPointer from passing i with leftPointer >=i
        // this will only run when we have too many zeros in the window 
        while (zeros > k && leftPointer <= i) {
            // if we remove a zero from window, dec zeros
            if (nums[leftPointer] === 0) zeros--;
            // move left pointer up
            leftPointer++;
            // update currConsecutiveOnes
            currConsecutiveOnes--;
        }

        // update maxConsecutiveOnes 
        maxConsecutiveOnes = Math.max(maxConsecutiveOnes, currConsecutiveOnes);
    }
    return maxConsecutiveOnes;
}


// ========================================================================
// Find K-Length Substrings With No Repeated Characters
// https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/

// Approach 
// store characters inside sliding window in Map for constant time complexity 
// iterate through array, moving window and checking if substring char don't repeat
// update substring count every iteration 

// Time Complexity: O(n), Space: O(n)
var numKLenSubstrNoRepeats = function (s, k) {
    // EDGE CASE
    if (k > s.length) return 0;

    // initalize cache map 
    const map = new Map();
    // initalize counter 
    let count = 0;

    // iterate through the array 
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        // add character to map 
        // key: char, value: count
        // if char not in map -> initalize to 0 
        if (!map.get(char)) map.set(char, 0);

        // increment map
        map.set(char, map.get(char) + 1);

        // if array is not size k yet (i+1<k)
        if (i + 1 < k) {
            // coninue 
            continue;
        }
        // if window size is greater than size k (i+1>k)
        // --> ie need to remove last character 
        if (i + 1 > k) {
            // delete last character from map 
            // if map.get(s[i-k]) > 1 -> decrement 
            if (map.get(s[i - k]) > 1) map.set(s[i - k], map.get(s[i - k]) - 1);
            // else delete the character from the map 
            else map.delete(s[i - k]);
        }


        // if substring has unique characters (ie size === k)
        if (map.size === k) {
            // increment count
            count++;
        }

    }

    return count
};


// ========================================================================
// Longest Substring with At Most Two Distinct Characters
// https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/

// Time Complexity: O(n), Space Complexity O(1)

// REFACTORED VERSION 
// -> using left-pointer + i to tract current length instead of extra variable 

var lengthOfLongestSubstringTwoDistinct = function (s) {
    // initalize variables 

    // left pointer to track left-bound of window 
    let leftPointer = 0;
    // initalize max = 0 
    let max = 0;
    // auxilary object ot track charatcers in substring 
    let map = new Map();

    // iterate throgh string 
    for (let i = 0; i < s.length; i++) {
        // add character to substring 

        // if it isn't in map, add it 
        if (!map.get(s[i])) map.set(s[i], 0);
        // increment char count
        map.set(s[i], map.get(s[i]) + 1);

        // check if window is not valid anymore (ie map.size > 2)
        // while window is not valid 
        while (map.size > 2 && leftPointer <= i) {
            // remove last character from sliding window 

            // if more than 1, just decrement it 
            if (map.get(s[leftPointer]) > 1) map.set(s[leftPointer], map.get(s[leftPointer]) - 1);
            // otherwise delete it
            else (map.delete(s[leftPointer]));

            // move left pointer 
            leftPointer++;
        }

        // update max 
        max = Math.max(i - leftPointer + 1, max);

    }

    return max;
};

// ========================================================================
// Longest Substring Without Repeating Characters
// https://leetcode.com/problems/longest-substring-without-repeating-characters/

var lengthOfLongestSubstring = function (s) {
    // EDGE CASE: 
    if (s.length === 1) return 1;

    // initalize variables 

    // leftBound: left-most char in substring
    // rightBound: right-most char in substring
    let leftBound = 0;
    let rightBound = 1;

    // running max length of substring 
    let maxLength = 0;

    // initalize set to track substring 
    let set = new Set(s[0]);

    // while iterating through string 
    while (leftBound < s.length && rightBound < s.length) {
        // get new character -> right-most character 
        let nextChar = s.charAt(rightBound);

        // if char not in susbtring (set)
        if (!set.has(nextChar)) {
            // add nextChar to set 
            set.add(nextChar);

            // increment rightBound -> grow sliding window to the right
            rightBound++;

            // update maxLength
            maxLength = (set.size > maxLength) ? set.size : maxLength;

        } else {
            // remove leftBound char from set 
            set.delete(s.charAt(leftBound));

            // increment leftBound -> shrink sliding window 'on the left'
            leftBound++;
        }
    }

    return maxLength;

};


// ========================================================================